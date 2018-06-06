import { get } from '../get'
import { post } from '../post'

export function getListData(page) {
    const result = get('/api/jigsawlist' + '/' + page)
    return result
}

//点赞
export function updateUserDianzan(dataId,userId,type)
{
  const result = post('/api/updateDianzan', {
      dataId: dataId,
      userId: userId,
      type:type
  })
  return result
}

//获取拼图详情
export function getListDetail(detailId)
{
  const result = get('/api/getListDetail' + '/' + detailId)
  return result
}
