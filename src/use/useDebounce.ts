import { onUnmounted, ref, watch, type Ref, type UnwrapRef } from 'vue'

// interface IDebounceFn<T> {
//   (...args: T[]): void | Promise<void>
// }
// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
//   let timer: number | null = null
//   return function f(this: void, ...args: T[]) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, delay)
//   }
// }

export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: number | null = null

  const unWatch = watch(value, (nv) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = nv as UnwrapRef<T>
    }, delay)
  })

  //解除监听
  onUnmounted(() => {
    unWatch()
  })

  return debounceValue
}
