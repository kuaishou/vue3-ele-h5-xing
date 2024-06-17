export interface ISearchRecomment {
  value: number
  label: string
}

export interface ISearchResult {
  type: number
  label: string
  resultCount: number
}
export interface ISearchResultList {
  list: ISearchResult[]
}
export interface IBanner {
  imgUrl: string
}
export interface IHomeInfo {
  banner: IBanner[]
  searchRecomments: ISearchRecomment[]
  transformer: ITransformer[]
  scrollBarInfoList: IScrollBarInfo[]
  countdown: Icountdown
  activites: string[]
}

export interface ITransformer {
  imgUrl: string
  label: string
}
export interface Icountdown {
  time: number
  goods: IGood
}

export interface IScrollBarInfo {
  type: string
  badge: string
  detail: string
  btn: string
}
