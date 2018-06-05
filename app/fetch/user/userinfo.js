import { get } from '../get'
import { post } from '../post'

export function registerUser(nickName, phone, password) {
    const result = post('/api/registerUser', {
        nickName,
        phone,
        password
    });
    return result;
}
export const loginUser = (phone, password) =>{
  const result = post('/api/loginUser', {
      phone,
      password
  });
  return result;
}

export const getUserById = (userId) => {
  const result = post('/api/getUserById', {
      userId
  });
  return result;
}

export const saveDanpinImg = (userId,imgval) => {
  const result = post('/api/saveDanpinImg', {
      userId,
      imgval
  });
  return result;
}
