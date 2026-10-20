/**
 * localStorage / sessionStorage 统一封装
 * 自动 JSON 序列化与反序列化,读取异常时安全返回 null
 */
export const storage = {
  get<T = string>(key: string, session = false): T | null {
    try {
      const raw = (session ? sessionStorage : localStorage).getItem(key)
      return raw === null ? null : (JSON.parse(raw) as T)
    } catch {
      return null
    }
  },

  set(key: string, value: unknown, session = false): void {
    try {
      ;(session ? sessionStorage : localStorage).setItem(key, JSON.stringify(value))
    } catch {
      // 存储空间不足等异常,静默失败
    }
  },

  remove(key: string, session = false): void {
    ;(session ? sessionStorage : localStorage).removeItem(key)
  },

  clear(session = false): void {
    ;(session ? sessionStorage : localStorage).clear()
  }
}
