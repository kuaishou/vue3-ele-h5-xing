import { Transition } from './Transition'

export interface Ipoint {
  x: number
  y: number
}

export { Transition as Animater }
export function createAnimater(content: HTMLElement) {
  return new Transition(content)
}
