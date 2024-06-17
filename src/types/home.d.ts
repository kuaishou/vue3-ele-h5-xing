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
