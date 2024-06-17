import { ref, type UnwrapRef } from 'vue'

export function useAsync<T>(asyncFn: () => Promise<T>, initValue: T, immediate = true) {
  const pending = ref(true)
  const data = ref(initValue)
  const error = ref(null)
  const execute = function () {
    return asyncFn()
      .then((res) => {
        data.value = res as UnwrapRef<T>
        pending.value = false
      })
      .catch((err) => {
        error.value = err
        pending.value = false
      })
  }
  if (immediate) {
    execute()
  }

  return {
    pending,
    data,
    error,
    execute
  }
}
