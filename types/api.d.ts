export type APIResponse<T> = {
  data: T;
  limit: number;
  page: number;
  total: number;
};
