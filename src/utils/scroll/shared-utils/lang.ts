import type { Ipoint } from '../animation'

export const getTime =
  Date.now ||
  function getTime() {
    return new Date().getTime()
  }

export const between = (n: number, min: number, max: number) => {
  if (n < min) {
    return min
  }
  if (n > max) {
    return max
  }
  return n
}

export function isSamePoint(startPoint: Ipoint, endPoint: Ipoint): boolean {
  return startPoint.x === endPoint.x && startPoint.y === endPoint.y
}

export function isUndef(v: unknown): boolean {
  return v === undefined || v === null
}
