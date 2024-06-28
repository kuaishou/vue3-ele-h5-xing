import type { IGood, IMenuList } from '@/types'
import axios from './base'

export const fetchGoodsListData = (shopId: string) => {
  return axios.get<IMenuList, IMenuList>('goods_list', {
    params: {
      shopId
    }
  })
}
export const fetchGoodsDetailData = (goodsId: string | number) => {
  return axios.get<IGood, IGood>('goods_detail', {
    params: { goodsId }
  })
}
