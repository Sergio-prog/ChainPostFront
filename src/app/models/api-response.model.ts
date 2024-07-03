export interface ApiResponse<T> {
  count: number;
  next: object;
  previous: object;
  results: T[];
}
