export type Post = {
  post_id: number,
  is_root: boolean,
  created_at: string,
  content: string,
  reads: number,
  root_id: number,
  parent_id: (number | null),
  author_id: number,
}

export interface MiddlewareError extends Error {
  log: string,
}