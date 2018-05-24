import { get } from '../get'
import { post } from '../post'

export function getListData(page) {
    const result = get('/api/jigsawlist' + '/' + page)
    return result
}

export function updateUserDianzan(dataId,userId,type)
{
  const result = post('/api/updateDianzan', {
      dataId: dataId,
      userId: userId,
      type:type
  })
  return result
}
