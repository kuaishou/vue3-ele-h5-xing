export function addEvent(el: HTMLElement, type: string, fn: () => never, capture: boolean) {
  el.addEventListener(type, fn, !!capture)
}
export function removeEvent(el: HTMLElement, type: string, fn: () => never, capture: boolean) {
  el.removeEventListener(type, fn, !!capture)
}

export function getRect(el: HTMLElement) {
  if (el instanceof SVGAElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
