import type { Options } from '../Options'
import type ActionsHanlder from '../base/ActionsHanlder'
import type Behavior from './Behavior'
import { EventEmitter } from '../shared-utils/event'
import type { Animater, Ipoint } from '../animation'
import { between, getTime } from '../shared-utils/lang'

export default class ScrollerActions {
  hooks: EventEmitter
  enabled!: boolean
  contentMove!: boolean
  startTime!: number
  endTime!: number
  constructor(
    public scrollBehaviorX: Behavior,
    public scrollBehaviorY: Behavior,
    public actionsHandler: ActionsHanlder,
    public animater: Animater,
    public options: Options
  ) {
    this.hooks = new EventEmitter(['start', 'scrollStart', 'scroll', 'scrollEnd'])
    this.enabled = true
    this.bindActionsHandler()
  }

  private bindActionsHandler() {
    const eventTypes = [
      { event: 'start', handler: this.handlerStart.bind(this) },
      { event: 'move', handler: this.handlerMove.bind(this) },
      { event: 'end', handler: this.handlerEnd.bind(this) }
    ]
    const hooks = this.actionsHandler.hooks
    eventTypes.forEach(({ event, handler }) => {
      hooks.on(hooks.eventTypes[event], (...arg: [number & TouchEvent, number & TouchEvent]) => {
        if (!this.enabled) {
          return true
        }
        return handler(...arg)
      })
    })
  }

  private handlerStart() {
    this.contentMove = false
    this.startTime = getTime()
    //强制停止滚动
    this.animater.doStop()
    this.scrollBehaviorX.resetStartPos()
    this.scrollBehaviorY.resetStartPos()
    this.hooks.emit(this.hooks.eventTypes.start, this.getCurrentPos())
  }
  private handlerMove(delatX: number, deltaY: number) {
    const prevX = this.scrollBehaviorX.getCurrentPos()
    const prevY = this.scrollBehaviorY.getCurrentPos()

    //获取X新坐标
    const newX = this.scrollBehaviorX.move(delatX)
    const newY = this.scrollBehaviorX.move(deltaY)

    const positionChanged = newX !== prevX || newY !== prevY

    //如果容器没有移动，且位置发生改变，就是开始滚动阶段
    if (!this.contentMove && positionChanged) {
      this.contentMove = true
      this.hooks.emit(this.hooks.eventTypes.scrollStart, this.getCurrentPos())
    }

    //如果容器正在移动，且位置发生改变，就是正在滚动阶段
    if (this.contentMove && positionChanged) {
      this.animater.translate({
        x: newX,
        y: newY
      })
      this.hooks.emit(this.hooks.eventTypes.move, this.getCurrentPos())
    }
  }
  private handlerEnd(e: TouchEvent) {
    let currentPos = this.getCurrentPos()
    //暴露一个end事件，让外部通过监听end事件实现禁止滚动
    if (this.hooks.emit(this.hooks.eventTypes.end, e, currentPos)) {
      return true
    }
    currentPos = this.ensureIntrgerPos(currentPos)
    this.animater.translate(currentPos)
    this.endTime = getTime()
    const duration = this.endTime - this.startTime
    this.hooks.emit(this.hooks.eventTypes.scrollEnd, currentPos, duration)
  }

  private ensureIntrgerPos(currentPos: Ipoint) {
    //保证坐标为有效坐标
    let { x, y } = currentPos
    x = x > 0 ? Math.ceil(x) : Math.floor(x)
    y = y > 0 ? Math.ceil(y) : Math.floor(y)
    x = between(x, this.scrollBehaviorX.maxScrollPos, this.scrollBehaviorX.minScrollPos)
    y = between(y, this.scrollBehaviorY.maxScrollPos, this.scrollBehaviorY.minScrollPos)

    return { x, y }
  }

  getCurrentPos() {
    return {
      x: this.scrollBehaviorX.getCurrentPos(),
      y: this.scrollBehaviorY.getCurrentPos()
    }
  }
  destory() {
    this.hooks.destory()
  }
}
