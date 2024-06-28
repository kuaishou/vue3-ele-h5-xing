import { cancelRAF, rAF } from '@/utils/raf'
import type { Ipoint } from '.'
import { EventEmitter } from '../shared-utils/event'

export class Transition {
  hooks
  content!: HTMLElement
  style!: CSSStyleDeclaration
  pending!: boolean
  timer = 0
  constructor(coutent: HTMLElement) {
    this.hooks = new EventEmitter(['beforeTranslate', 'translate', 'translateEnd'])
    this.setContent(coutent)
  }
  private setContent(content: HTMLElement) {
    if (content !== this.content) {
      this.content = content
      this.style = content.style as CSSStyleDeclaration
    }
  }
  private getComputedPostion() {
    const cssStyle = window.getComputedStyle(this.content, null) as CSSStyleDeclaration
    const _matril = cssStyle['transform'].split(')')[0].split(', ')
    const x = +(_matril[12] || _matril[4]) || 0
    const y = +(_matril[13] || _matril[5]) || 0
    return { x, y }
  }
  private startStep() {
    const step = () => {
      const pos = this.getComputedPostion()
      this.hooks.emit(this.hooks.eventTypes.move, pos)
      if (this.pending) {
        this.timer = rAF(step)
      } else {
        this.hooks.emit(this.hooks.eventTypes.end, pos)
      }
    }
    cancelRAF(this.timer)
    step()
  }
  setPending(pending: boolean) {
    this.pending = pending
  }
  transitionTimingFunction(easing: string) {
    this.style['transitionTimingFunction'] = easing
  }
  transitionTime(time = 0) {
    this.style['transitionDuration'] = `${time}ms`
  }
  translate(point: Ipoint) {
    const { x, y } = point
    this.hooks.emit(this.hooks.eventTypes.beforeTranslate, point)
    this.style['transform'] = `traslate(${x}px,${y}px)`
    this.hooks.emit(this.hooks.eventTypes.translate, point)
  }
  move(endPoint: Ipoint, time: number, easeingFn: string) {
    this.setPending(time > 0)
    this.transitionTimingFunction(easeingFn)
    this.transitionTime(time)
    this.translate(endPoint)
    this.startStep()
  }
  doStop() {
    const pending = this.pending
    if (pending) {
      this.setPending(false)
      const { x, y } = this.getComputedPostion()
      this.transitionTime()
      this.translate({ x, y })
    }
  }
  destory() {
    this.hooks.destory()
    cancelRAF(this.timer)
  }
}
