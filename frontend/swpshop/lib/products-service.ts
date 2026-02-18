type ApiError = {
  type:
    | "api"
    | "config"
    | "http"
    | "network"
    | "not_found"
    | "parse"
    | "validation";
  message: string;
  status: number | null;
  code: string | null;
  details: unknown | null;
  retryable: boolean;
};

type ApiResult<T> =
  | { ok: true; data: T; meta: unknown | null; error: null }
  | { ok: false; data: null; meta: null; error: ApiError };

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number | null;
  availability: string | null;
  images: string[];
};

const backendBaseUrl =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "";

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function createError({
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

async function request<T>(path: string): Promise<ApiResult<T>> {
  if (!backendBaseUrl) {
    return {
      ok: false,
      data: null,
      meta: null,
      error: createError({
        type: "config",
        message: "Backend URL ist nicht konfiguriert.",
      }),
    };
  }

  const url = `${normalizeBaseUrl(backendBaseUrl)}${path}`;

  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch (error: any) {
    return {
      ok: false,
      data: null,
      meta: null,
      error: createError({
        type: "network",
        message: error?.message || "Netzwerkfehler.",
        details: error,
        retryable: true,
      }),
    };
  }

  let payload: any = null;
  try {
    payload = await response.json();
  } catch (error: any) {
    if (!response.ok) {
      return {
        ok: false,
        data: null,
        meta: null,
        error: createError({
          type: response.status === 404 ? "not_found" : "http",
          message: "Fehlerhafte Antwort vom Backend.",
          status: response.status,
        }),
      };
    }

    return {
      ok: false,
      data: null,
      meta: null,
      error: createError({
        type: "parse",
        message: "Antwort konnte nicht gelesen werden.",
        status: response.status,
        details: error,
      }),
    };
  }

  if (!response.ok) {
    if (payload?.error) {
      return {
        ok: false,
        data: null,
        meta: null,
        error: payload.error as ApiError,
      };
    }

    return {
      ok: false,
      data: null,
      meta: null,
      error: createError({
        type: response.status === 404 ? "not_found" : "http",
        message: "Backend Fehler.",
        status: response.status,
        details: payload,
      }),
    };
  }

  return {
    ok: true,
    data: payload?.data ?? null,
    meta: payload?.meta ?? null,
    error: null,
  } as ApiResult<T>;
}

export function formatPrice(price: number | null) {
  if (price === null) {
    return "Preis auf Anfrage";
  }

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(price);
}

export async function getProductList(): Promise<ApiResult<Product[]>> {
  const result = await request<Product[]>("/api/products");

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    data: Array.isArray(result.data) ? result.data : [],
    meta: result.meta || null,
    error: null,
  };
}

export async function getProductBySlug(
  slug: string
): Promise<ApiResult<Product>> {
  if (!slug) {
    return {
      ok: false,
      data: null,
      meta: null,
      error: {
        type: "not_found",
        message: "Produkt nicht gefunden.",
        status: 404,
        code: null,
        details: { slug },
        retryable: false,
      },
    };
  }

  return request<Product>(`/api/products/${encodeURIComponent(slug)}`);
}
