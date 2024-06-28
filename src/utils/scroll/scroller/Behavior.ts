import type { BehaviorOptions } from '../Options'
import { getRect } from '../shared-utils/dom'
export default class Behavior {
  wrapperSize!: number
  contentSize!: number
  content!: HTMLElement
  currentPos!: number
  startPos!: number
  minScrollPos!: number
  maxScrollPos!: number
  hasScroll!: boolean
  constructor(
    public wrapper: HTMLElement,
    content: HTMLElement,
    public options: BehaviorOptions
  ) {
    this.refresh(content)
  }
  private refresh(content: HTMLElement) {
    const { size } = this.options.rect
    this.wrapperSize = this.wrapper[size === 'width' ? 'clientWidth' : 'clientHeight']
    this.setContent(content)
    const contentSize = getRect(this.content)
    this.contentSize = contentSize[size as 'width' | 'height']
    this.computBounfary()
  }
  private setContent(content: HTMLElement) {
    if (this.content !== content) {
      this.content = content
      this.resetState()
    }
  }
  private resetState() {
    this.currentPos = 0
    this.startPos = 0
    this.resetStartPos()
  }
  private computBounfary() {
    this.minScrollPos = 0
    this.maxScrollPos = this.wrapperSize - this.contentSize
    this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos
  }
  private performDampingAlgorithm(detla: number, dampingFatcot: number) {
    let newPos = this.currentPos + detla
    if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
      if (
        (newPos > this.minScrollPos && this.options.bounces[0]) ||
        (newPos < this.maxScrollPos && this.options.bounces[1])
      ) {
        newPos = this.currentPos + detla * dampingFatcot
      } else {
        newPos = newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos
      }
    }
    return newPos
  }
  private adjustPosition(pos: number) {
    if (!this.hasScroll) {
      return this.minScrollPos
    }
    if (pos > this.minScrollPos) {
      return this.minScrollPos
    }
    if (pos < this.maxScrollPos) {
      return this, this.maxScrollPos
    }
    return pos
  }
  private momentum(
    current: number,
    start: number,
    time: number,
    lowerMargin: number,
    upperMargin: number,
    wrapperSize: number,
    options = this.options
  ) {
    const distance = current - start
    const speed = Math.abs(distance) / time
    const { deceleration, swipeBounceTime, swipeTime } = options
    const duration = Math.min(swipeTime, (speed * 2) / deceleration)
    const momentumData = {
      destination: current + ((speed * speed) / deceleration) * (distance < 0 ? -1 : 1), //速度
      duration,
      rate: 15
    }
    if (momentumData.duration < lowerMargin) {
      momentumData.duration = wrapperSize
        ? Math.max(
            lowerMargin - wrapperSize / 4,
            lowerMargin - (wrapperSize / momentumData.rate) * speed
          )
        : lowerMargin
      momentumData.duration = swipeBounceTime
    } else if (momentumData.destination > upperMargin) {
      momentumData.destination = wrapperSize
        ? Math.min(
            upperMargin + wrapperSize / 4,
            upperMargin + (wrapperSize / momentumData.rate) * speed
          )
        : upperMargin
      momentumData.duration = swipeBounceTime
    }
    momentumData.destination = Math.round(momentumData.destination)
    return momentumData
  }
  resetStartPos() {
    this.startPos = this.currentPos
  }
  getCurrentPos() {
    return this.currentPos
  }
  move(delta: number) {
    delta = this.hasScroll ? delta : 0
    return this.performDampingAlgorithm(delta, this.options.outOfBoundaryDampingFactor)
  }
  updatePosition(pos: number) {
    this.currentPos = pos
  }
  checkInBoundary() {
    const position = this.adjustPosition(this.currentPos)
    const inBoundary = position === this.getCurrentPos()
    return {
      position,
      inBoundary
    }
  }
  end(duration: number) {
    let mementumIfo = {
      destination: 0,
      duration: 0,
      rate: 0
    }
    const absDist = Math.abs(this.currentPos - this.startPos)
    if (this.options.momentum && duration < this.options.momentumLImitTime && absDist) {
      mementumIfo = this.hasScroll
        ? this.momentum(
            this.currentPos,
            this.startPos,
            duration,
            this.maxScrollPos,
            this.minScrollPos,
            this.wrapperSize,
            this.options
          )
        : {
            destination: this.currentPos,
            duration: 0,
            rate: 0
          }
    }
    return mementumIfo
  }
}
