import { onDeactivated, onUnmounted, watch } from 'vue'
import { onMountedOrActivated } from './onMountedOrActivated'
//控制页面滚动
const BODY_LOCK_CLASS = 'op-overflow-hidden'
let totalLockCount = 0

export function useLockScroll(shouldLock: () => boolean) {
  const lock = () => {
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }
    totalLockCount++
  }
  const unLock = () => {
    if (totalLockCount) {
      totalLockCount--
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  }
  onMountedOrActivated(() => {
    if (shouldLock()) {
      lock()
    }
  })
  const destroy = () => shouldLock() && unLock()
  onDeactivated(() => destroy)
  onUnmounted(() => destroy)
  watch(shouldLock, (v) => {
    if (v) {
      lock()
    } else {
      unLock()
    }
  })
}
