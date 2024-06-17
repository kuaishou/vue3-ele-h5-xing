import { onUnmounted } from 'vue'

export function useTimeout(fn: () => void, delay: number) {
  const timer = setTimeout(() => {
    fn()
  }, delay)
  const clear = () => {
    clearTimeout(timer)
  }
  onUnmounted(() => clear())
  return clear
}
