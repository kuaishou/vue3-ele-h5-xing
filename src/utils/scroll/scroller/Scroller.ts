import { createBehaviorOptions, type Options } from '../Options'
import { createAnimater, type Ipoint } from '../animation'
import ActionsHanlder from '../base/ActionsHanlder'
import { ease } from '../shared-utils/ease'
import { EventEmitter, EventRegister } from '../shared-utils/event'
import ScrollerActions from './Actions'
import Behavior from './Behavior'

export default class Scroller {
  hooks: EventEmitter
  scrollBehaviorX: Behavior
  scrollBehaviorY: Behavior
  actionsHandler
  animater
  actions
  transitionEndRegister!: EventRegister
  constructor(
    public wrapper: HTMLElement,
    public content: HTMLElement,
    public options: Options
  ) {
    this.hooks = new EventEmitter(['beforeScroll', 'scrollStaret', 'scroll', 'end', 'scrollEnd'])
    const { left, right, top, bottom } = options.bounce as any
    this.scrollBehaviorX = new Behavior(
      wrapper,
      content,
      createBehaviorOptions(options, 'scrollX', [left, right], {
        size: 'width'
      })
    )
    this.scrollBehaviorY = new Behavior(
      wrapper,
      content,
      createBehaviorOptions(options, 'scrollY', [top, bottom], {
        size: 'height'
      })
    )
    this.actionsHandler = new ActionsHanlder(this.wrapper)
    this.animater = createAnimater(content)
    this.actions = new ScrollerActions(
      this.scrollBehaviorX,
      this.scrollBehaviorY,
      this.actionsHandler,
      this.animater,
      this.options
    )

    //处理惯性滑动杆到边缘时候，回弹的效果
    this.registerTransitionEnd()
    this.init()
  }

  private registerTransitionEnd() {
    this.transitionEndRegister = new EventRegister(this.content, [
      {
        name: 'transitionend',
        handler: this.registerTransitionEnd.bind(this)
      }
    ])
  }

  private transitionEnd(e: TouchEvent) {
    if (e.target !== this.content || this.animater.pending) {
      return
    }
    this.animater.transitionTime()
    //当前这个位置是否越界，如果越界就重置
    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
      return
    }
    this.animater.setPending(false)
    this.hooks.emit(this.hooks.eventTypes.scrollEnd, this.getCurrentPos())
  }

  private init() {
    this.bindAnimater()
    this.bindActions()
  }

  private bindAnimater() {
    const hooks = this.animater.hooks
    hooks.on(hooks.eventTypes.translate, (pos: Ipoint) => {
      this.updatePostions(pos)
    })
    hooks.on(hooks.eventTypes.move, (pos: Ipoint) => {
      this.hooks.emit(hooks.eventTypes.scroll, pos)
    })
    hooks.on(hooks.eventTypes.end, (pos: Ipoint) => {
      this.animater.pending = false
      this.hooks.emit(hooks.eventTypes.scrollEnd, pos)
    })
  }
  private bindActions() {
    const hooks = this.animater.hooks
    hooks.on(hooks.eventTypes.start, (pos: Ipoint) => {
      this.hooks.emit(hooks.eventTypes.beforeScroll, pos)
    })
    hooks.on(hooks.eventTypes.scrollStart, (pos: Ipoint) => {
      this.hooks.emit(hooks.eventTypes.scrollStart, pos)
    })
    hooks.on(hooks.eventTypes.scroll, (pos: Ipoint) => {
      this.hooks.emit(hooks.eventTypes.scroll, pos)
    })
    hooks.on(hooks.eventTypes.end, (pos: Ipoint) => {
      if (this.hooks.emit(hooks.eventTypes.end, pos)) {
        return
      }
      //判断当前位置四否越界，如果越界重置
      if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
        return this.transitionEnd
      }
    })
    hooks.on(hooks.eventTypes.scrollEnd, (pos: Ipoint, duration: number) => {
      if (this.momentum(ops, duration)) {
        return
      }
      if (this.actions.contentMove) {
        this.hooks.emit(hooks.eventTypes.scrollEnd, pos)
      }
    })
  }
  private resetPosition(time = 0, easing = ease.bounce) {
    const { position: x, inBoundary: xInBoundary } = this.scrollBehaviorX.checkInBoundary()
    const { position: y, inBoundary: yInBoundary } = this.scrollBehaviorY.checkInBoundary()
    //如果未越界，返回false
    if (xInBoundary && yInBoundary) {
      return false
    }
    //如果越界了则使用边界动画滚动到边界
    this.scrollTo(x, y, time, easing)
    return true
  }

  private momentum(pos: Ipoint, duration: number) {
    const meta = {
      time: 0,
      easing: ease.swipe,
      newX: pos.x,
      newY: pos.y
    }
    const momentumX = this.scrollBehaviorX.end(duration)
    const momentumY = this.scrollBehaviorY.end(duration)

    meta.newX = isUndef(momentumX.destination) ? meta.newX : (momentumX.destination as number)
    meta.newY = isUndef(momentumY.destination) ? meta.newY : (momentumY.destination as number)

    meta.time = Math.max(momentumX.duration as number, momentumX.duration as number)

    if (meta.newX !== pos.x || meta.newY !== pos.y) {
      if (
        meta.newX > this.scrollBehaviorX.minScrollPos ||
        meta.newX < this.scrollBehaviorX.maxScrollPos ||
        meta.newY > this.scrollBehaviorY.minScrollPos ||
        meta.newY > this.scrollBehaviorY.maxScrollPos
      ) {
        this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing)
        return true
      }
    }
  }
}
