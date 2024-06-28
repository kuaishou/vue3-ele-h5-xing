import { EventEmitter as EE } from '@/utils/event'
import { addEvent, removeEvent } from './dom'

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

export class EventRegister {
  constructor(
    public wrapper: HTMLElement,
    public events: EventData[]
  ) {
    this.addDOMEvents()
  }
  private addDOMEvents() {
    this.handleDOMEvents(addEvent)
  }
  private removeDOMEvents() {
    this.handleDOMEvents(removeEvent)
  }
  private handleDOMEvents(eventOption: Fn) {
    this.events.forEach((event: EventData) => {
      eventOption(this.wrapper, event.name, event.handler, !!event.capture)
    })
  }
  destory() {
    this.removeDOMEvents()
    this.events = []
  }
}
