/** 登录凭证存储键名,如多应用共存同一域,建议加前缀区分 */
export const TOKEN_KEY = 'APP_TOKEN'

/** 用户信息存储键名 */
export const USER_INFO_KEY = 'APP_USER_INFO'

/**
 * 后端业务成功状态码。
 * 拦截器据此判断请求是否成功,请与后端约定保持一致(常见为 0 或 200)。
 */
export const SUCCESS_CODE = 0
