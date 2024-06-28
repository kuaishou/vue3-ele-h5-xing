export type Bounces = [boolean, boolean]
export type Rect = {
  size: string
}
interface BaseOptions {
  scrollX: boolean
  scrollY: boolean
  momentum: boolean
  momentumLImitTime: number
  momentumLImitDistance: number
  swipeTime: number
  swipeBounceTime: number
  deceleration: number
  outOfBoundaryDampingFactor: number
}

export interface Options extends BaseOptions {
  [key: string]: unknown
  startX: number
  startY: number
}

export interface BehaviorOptions extends BaseOptions {
  scrollable: boolean
  bounces: Bounces
  rect: Rect
}
export class OptionsConstructor implements Options {
  [key: string]: unknown
  startX: number
  startY: number
  scrollX: boolean
  scrollY: boolean
  momentum: boolean
  momentumLImitTime: number
  momentumLImitDistance: number
  swipeTime: number
  swipeBounceTime: number
  deceleration: number
  outOfBoundaryDampingFactor: number
  constructor() {
    this.bounce = {
      top: true,
      bottom: true,
      left: true,
      right: true
    }
    this.scrollX = true
    this.scrollY = true
    this.momentum = true
    this.momentumLImitTime = 300
    this.momentumLImitDistance = 15
    this.swipeTime = 2500
    this.swipeBounceTime = 500
    this.deceleration = 0.0015
    this.outOfBoundaryDampingFactor = 1 / 3

    this.startX = 300
    this.startY = 300
    this.bounceTime = 300
  }
  merge(options?: Options) {
    for (const key in options) {
      this[key] = options[key]
    }
  }
}

export function createBehaviorOptions(
  msOptions: Options,
  extraprop: 'scrollX' | 'scrollY',
  bounces: Bounces,
  rect: Rect
) {
  const options = [
    'momentum',
    'momentumLImitTime',
    'momentumLImitDistance',
    'swipeTime',
    'swipeBounceTime',
    'deceleration',
    'outOfBoundaryDampingFactor'
  ].reduce(
    (p, v) => ({
      [v]: msOptions[v],
      ...p
    }),
    {} as BehaviorOptions
  )
  options.scrollable = !!msOptions[extraprop]
  options.bounces = bounces
  options.rect = rect
  return options
}
