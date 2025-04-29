export interface ResponseMeta {
  pagination: {
    current: number;
    next?: number;
    last?: number;
    records?: number;
  }
}
