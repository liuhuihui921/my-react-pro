import { get } from '../get'
import { post } from '../post'

export function getDesignManList(type) {
    const result = get('/api/designManList'+ '/' + type)
    return result
}
//关注/取消关注
export const followUser = (type,dataId,userId) =>{
  const result = post('/api/followUser', {
    dataId,
    userId,
    type
  });
  return result;
}

//收藏/取消收藏设计
export const collectionDesign = (type,dataId,userId) =>{
  const result = post('/api/collectionDesign', {
    dataId,
    userId,
    type
  });
  return result;
}
