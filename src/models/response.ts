export interface ResponsePagination<T> {
  data: T
  page: number
  pageSize: number
  total: number
}

export interface Response<T> {
  data: T
}
