export interface IMeInfo {
  cards: ICard[]
  superCard: ISuperCard
}
export interface ICard {
  label: string
  size: number
  items: IItem[]
}
export interface IItem {
  count: number
  iconUrl: string
  label: string
}
export interface ISuperCard {
  beanCount: number
  tips: string
}
