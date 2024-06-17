interface IDebounceFn<T> {
  (...args: T[]): void | Promise<void>
}
export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
  let timer: number | null = null
  return function f(this: void, ...args: T[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}
