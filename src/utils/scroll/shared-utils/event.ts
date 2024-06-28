import { EventEmitter as EE } from '@/utils/event'

export interface EventData {
  name: string
  handler(e: UIEvent): void
  capture?: boolean
}

type Fn = (...args: any[]) => void

export class EventEmitter extends EE {
  eventTypes: Record<string, string>
  constructor(names: string[]) {
    super()
    this.eventTypes = {}
    if (names) {
      this.registerType(names)
    }
  }

  private registerType(names: string[]) {
    names.forEach((type) => {
      this.eventTypes[type] = type
    })
  }
  destory() {
    super.destory()
    this.eventTypes = {}
  }
}

export class EventRegister extends EE {
  eventTypes: Record<string, string>
  constructor(names: string[]) {
    super()
    this.eventTypes = {}
    if (names) {
      this.registerType(names)
    }
  }

  private registerType(names: string[]) {
    names.forEach((type) => {
      this.eventTypes[type] = type
    })
  }
  destory() {
    super.destory()
    this.eventTypes = {}
  }
}
