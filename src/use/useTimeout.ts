import { onUnmounted as _onUnmounted } from 'vue'

export function useTimeout(fn: () => void, delay?: number, onUnmounted = _onUnmounted) {
  const timer = setTimeout(() => {
    fn()
  }, delay)
  const clear = () => {
    clearTimeout(timer)
  }
  onUnmounted(() => clear())
  return clear
}
