import type { ApiResult } from "./client";

function toCommaSeparated(value: string | string[]) {
  if (Array.isArray(value)) {
    return value.join(",");
  }

  return value;
}

function createValidationError(message: string, details: unknown = null) {
  return {
    ok: false,
    data: null,
    meta: null,
    error: {
      type: "validation",
      message,
      status: null,
      code: null,
      details,
      retryable: false,
    },
  } as const;
}

function buildProductsQuery({
  filter,
  fields,
  limit,
  page,
  search,
  sort,
}: {
  filter?: Record<string, unknown>;
  fields?: string | string[];
  limit?: number;
  page?: number;
  search?: string;
  sort?: string | string[];
} = {}) {
  const query: Record<string, unknown> = {};

  if (filter) {
    query.filter = filter;
  }

  if (fields) {
    query.fields = toCommaSeparated(fields);
  }

  if (sort) {
    query.sort = toCommaSeparated(sort);
  }

  if (typeof limit === "number") {
    query.limit = limit;
  }

  if (typeof page === "number") {
    query.page = page;
  }

  if (search) {
    query.search = search;
  }

  return query;
}

export function createProductsApi(
  client: {
    get: (
      path: string,
      options?: {
        query?: Record<string, unknown>;
        signal?: AbortSignal;
        fetchOptions?: RequestInit;
      }
    ) => Promise<ApiResult<any>>;
  },
  { collection = "Products" }: { collection?: string } = {}
) {
  const collectionPath = `/items/${encodeURIComponent(collection)}`;

  async function listProducts(options: {
    filter?: Record<string, unknown>;
    fields?: string | string[];
    limit?: number;
    page?: number;
    search?: string;
    sort?: string | string[];
    signal?: AbortSignal;
    fetchOptions?: RequestInit;
  } = {}) {
    const { signal, fetchOptions, ...queryOptions } = options;
    const query = buildProductsQuery(queryOptions);

    const result = await client.get(collectionPath, {
      query,
      signal,
      fetchOptions,
    });

    if (!result.ok) {
      return result;
    }

    return {
      ok: true,
      data: Array.isArray(result.data) ? result.data : [],
      meta: result.meta || null,
      error: null,
    } as const;
  }

  async function getProductDetail(
    productId: string | number,
    options: { fields?: string | string[]; signal?: AbortSignal } = {}
  ) {
    if (productId === undefined || productId === null || productId === "") {
      return createValidationError("A valid productId is required.", {
        productId,
      });
    }

    const { signal, fields } = options;
    const query = fields ? { fields: toCommaSeparated(fields) } : undefined;

    return client.get(`${collectionPath}/${encodeURIComponent(productId)}`, {
      query,
      signal,
    });
  }

  async function queryProducts(options: Parameters<typeof listProducts>[0] = {}) {
    return listProducts(options);
  }

  return {
    listProducts,
    getProductDetail,
    queryProducts,
  };
}
