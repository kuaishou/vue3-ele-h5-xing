import type { ISearchResultList } from '@/types'
import axios from './base'
type inputType = string | number
export const fetchSearchData = (key: inputType = '') => {
  return axios.get<ISearchResultList, ISearchResultList>('home_search', {
    params: {
      _label_like: key
    }
  })
}
