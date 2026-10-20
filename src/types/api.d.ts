/** 后端统一响应结构(按实际后端约定调整) */
interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}
