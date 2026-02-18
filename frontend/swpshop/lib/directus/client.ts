export type ApiErrorType =
  | "api"
  | "config"
  | "http"
  | "network"
  | "not_found"
  | "parse"
  | "validation";

export type ApiError = {
  type: ApiErrorType;
  message: string;
  status: number | null;
  code: string | null;
  details: unknown | null;
  retryable: boolean;
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  meta: unknown | null;
  error: null;
};

export type ApiFailure = {
  ok: false;
  data: null;
  meta: null;
  error: ApiError;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

type RequestOptions = {
  method?: string;
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  fetchOptions?: RequestInit;
};

function sanitizeBaseUrl(baseUrl?: string) {
  if (!baseUrl || typeof baseUrl !== "string") {
    return null;
  }

  const trimmed = baseUrl.trim();
  return trimmed ? trimmed.replace(/\/+$/, "") : null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function appendQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: unknown
) {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return;
    }

    searchParams.append(key, value.join(","));
    return;
  }

  if (isObject(value)) {
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
      appendQueryParam(searchParams, `${key}[${nestedKey}]`, nestedValue);
    });
    return;
  }

  searchParams.append(key, String(value));
}

export function serializeQuery(query: Record<string, unknown> = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    appendQueryParam(searchParams, key, value);
  });

  return searchParams.toString();
}

function createApiError({
  type,
  message,
  status = null,
  code = null,
  details = null,
  retryable = false,
}: Partial<ApiError> & Pick<ApiError, "type" | "message">): ApiError {
  return {
    type,
    message,
    status,
    code,
    details,
    retryable,
  };
}

async function resolveToken(tokenOrProvider?: string | (() => string | null)) {
  if (!tokenOrProvider) {
    return null;
  }

  if (typeof tokenOrProvider === "function") {
    return tokenOrProvider();
  }

  return tokenOrProvider;
}

function buildUrl(baseUrl: string, path: string, query?: Record<string, unknown>) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const queryString = serializeQuery(query);

  if (!queryString) {
    return `${baseUrl}${normalizedPath}`;
  }

  return `${baseUrl}${normalizedPath}?${queryString}`;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (isJson) {
    return response.json();
  }

  const text = await response.text();
  return text ? { raw: text } : {};
}

function mapDirectusError(payload: any, status: number): ApiError {
  const directusError =
    payload?.errors?.[0] || payload?.error || payload?.errors || payload;

  return createApiError({
    type: "api",
    message:
      directusError?.message ||
      `Directus API request failed with status ${status}.`,
    status,
    code: directusError?.extensions?.code || directusError?.code || null,
    details: directusError,
    retryable: status >= 500,
  });
}

function mapHttpError(status: number, payload: unknown): ApiError {
  return createApiError({
    type: "http",
    message: `HTTP request failed with status ${status}.`,
    status,
    details: payload || null,
    retryable: status >= 500,
  });
}

function unwrapData(payload: any) {
  if (isObject(payload) && "data" in payload) {
    return { data: payload.data, meta: payload.meta || null };
  }

  return { data: payload, meta: null };
}

export function createDirectusClient({
  baseUrl,
  token,
  fetchFn = fetch,
}: {
  baseUrl?: string;
  token?: string | (() => string | null);
  fetchFn?: typeof fetch;
} = {}) {
  const normalizedBaseUrl = sanitizeBaseUrl(baseUrl);

  async function request(path: string, options: RequestOptions = {}): Promise<ApiResult<any>> {
    if (!normalizedBaseUrl) {
      return {
        ok: false,
        data: null,
        meta: null,
        error: createApiError({
          type: "config",
          message: "Directus baseUrl is missing or invalid.",
        }),
      };
    }

    const {
      method = "GET",
      query,
      body,
      headers = {},
      signal,
      fetchOptions,
    } = options;

    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };

    if (body !== undefined && body !== null && !(body instanceof FormData)) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const resolvedToken = await resolveToken(token);
    if (resolvedToken) {
      requestHeaders.Authorization = `Bearer ${resolvedToken}`;
    }

    const url = buildUrl(normalizedBaseUrl, path, query);

    let response: Response;
    try {
      response = await fetchFn(url, {
        method,
        headers: requestHeaders,
        body:
          body === undefined || body === null || body instanceof FormData
            ? body
            : JSON.stringify(body),
        signal,
        cache: "no-store",
        ...fetchOptions,
      });
    } catch (error: any) {
      return {
        ok: false,
        data: null,
        meta: null,
        error: createApiError({
          type: "network",
          message: error?.message || "Network request failed.",
          details: error,
          retryable: true,
        }),
      };
    }

    let payload: any;
    try {
      payload = await parseResponse(response);
    } catch (error: any) {
      return {
        ok: false,
        data: null,
        meta: null,
        error: createApiError({
          type: "parse",
          message: "Unable to parse API response.",
          status: response.status,
          details: error,
        }),
      };
    }

    if (!response.ok) {
      const hasDirectusError = Boolean(payload?.errors || payload?.error);
      return {
        ok: false,
        data: null,
        meta: null,
        error: hasDirectusError
          ? mapDirectusError(payload, response.status)
          : mapHttpError(response.status, payload),
      };
    }

    const { data, meta } = unwrapData(payload);
    return {
      ok: true,
      data,
      meta,
      error: null,
    };
  }

  return {
    request,
    get: (path: string, options: RequestOptions = {}) =>
      request(path, { ...options, method: "GET" }),
    post: (path: string, body: unknown, options: RequestOptions = {}) =>
      request(path, { ...options, method: "POST", body }),
    patch: (path: string, body: unknown, options: RequestOptions = {}) =>
      request(path, { ...options, method: "PATCH", body }),
    delete: (path: string, options: RequestOptions = {}) =>
      request(path, { ...options, method: "DELETE" }),
  };
}
