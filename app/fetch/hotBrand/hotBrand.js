import { get } from '../get'
import { post } from '../post'

export function getHotBrandList(type) {
    const result = get('/api/hotBrandList'+ '/' + type)
    return result
}

export const collectionBrand = (type,dataId,userId) =>{
  const result = post('/api/collectionBrand', {
    dataId,
    userId,
    type
  });
  return result;
}
