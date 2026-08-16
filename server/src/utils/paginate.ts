import type { Request } from "express";

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type Paginated<T> = { data: T[]; meta: Meta };

export function parsePagination(query: Request["query"], maxLimit = 100) {
  const page = Math.max(1, Number.parseInt(String(query.page ?? "1"), 10) || 1);
  const limit = Math.min(
    maxLimit,
    Math.max(1, Number.parseInt(String(query.limit ?? "20"), 10) || 20),
  );
  return { page, limit, skip: (page - 1) * limit, take: limit };
}

export function buildMeta(page: number, limit: number, total: number): Meta {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}
