import { cancelRAF, rAF } from '@/utils/raf'
import { computed, onUnmounted, ref } from 'vue'

type CurrentTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  millisecond: number
  total: number
}
type useCountDownOptions = {
  time: number
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const millisecond = Math.floor(time % SECOND)
  return {
    days,
    hours,
    minutes,
    seconds,
    millisecond,
    total: time
  }
}

const isSameSecond = (time1: number, time2: number) => {
  //是否在同一秒
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}
export function useCountDown(options: useCountDownOptions) {
  const remain = ref(options.time)
  let refId: number
  let endTime: number
  let counting: boolean
  const current = computed(() => parseTime(remain.value))
  // return num.toString().padStart(2, '0')
  const pause = () => {
    counting = false
    cancelRAF(refId)
  }
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0) //剩余时间
  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)
    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }
  const microTick = () => {
    refId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain)
        }
        if (remain.value > 0) {
          microTick()
        }
      }
    })
  }
  const macrTick = () => {
    refId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        setRemain(remainRemain)
        if (remain.value > 0) {
          macrTick()
        }
      }
    })
  }
  const tick = () => {
    if (options.millisecond) {
      microTick()
    } else {
      macrTick()
    }
  }
  const start = () => {
    if (counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }
  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }

  return {
    start,
    pause,
    reset,
    current
  }
}
