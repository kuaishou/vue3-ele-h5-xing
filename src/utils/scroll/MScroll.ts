import { EventEmitter } from './shared-utils/event'
import Scroller from './scroller/Scroller'
import { ease } from './shared-utils/ease'

import { OptionsConstructor, type Options } from './Options'

export class MScrollContructor extends EventEmitter {
  content!: HTMLElement
  options!: OptionsConstructor
  scroller!: Scroller
  constructor(el: HTMLElement, options?: Options) {
    super(['beforeScrollStart', 'scrollStart', 'scroll', 'scrollEnd'])

    const wrapper = el
    if (!wrapper) {
      console.log('wrapper不能为空')
      return
    }
    if (!this.setContent(wrapper)) {
      return
    }
    this.options = new OptionsConstructor().merge(options)
    this.init(wrapper)
  }

  private setContent(wrapper: HTMLElement) {
    const countent = wrapper.children[0] as HTMLElement
    if (!countent) {
      return false
    }
    this.content = countent
  }
  private init(wrapper: HTMLElement) {
    this.scroller = new Scroller(wrapper, this.content, this.options)
    this.eventBubbling()
    const { startX, startY } = this.options
    this.scroller.scrollTo(startX, startY)
  }
  private eventBubbling() {
    const hooks = this.scroller.hooks
    Object.keys(this.eventTypes).forEach((event) => {
      hooks.on(hooks.eventTypes[event], (...args) => {
        this.emit(this.eventTypes[event], ...args)
      })
    })
  }
  scrollTo(x: number, y: number, time = 0, easing = ease.bounce) {
    this.scroller.scrollTo(x, y, time, easing)
  }
  destory() {
    this.scroller.destory()
  }
  // scroller,
  // options
}

export function createMScroll(el: HTMLElement, options?: Options) {
  const ms = new MScrollContructor(el, options)
  return ms
}
