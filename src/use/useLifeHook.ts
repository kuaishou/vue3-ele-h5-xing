import { onUnmounted as _onUnmounted } from 'vue'

type Hook = () => void
type LifeHook = (hook: Hook) => any
interface IHookItem {
  hooks: LifeHook
  queue: Hook[]
}

const hookMap: Record<string, IHookItem> = {
  onUnmounted: {
    hooks: _onUnmounted,
    queue: []
  }
}

export function useLifeHook() {
  const keys = Object.keys(hookMap)
  return keys.reduce(
    (p, key) => {
      const hookItem = hookMap[key]
      hookItem.hooks(() => {
        hookItem.queue.forEach((v) => v())
      })
      return {
        ...p,
        [key]: (hook: Hook) => {
          hookItem.queue.push(hook)
        }
      }
    },
    {} as Record<string, LifeHook>
  )
}
