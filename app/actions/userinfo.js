import * as actionTypes from 'constants/userinfo'

// export function update(data) {
//     return {
//         type: actionTypes.USERINFO_UPDATE,
//         data
//     }
// }

//注册&登录 保存输入框内容
export const saveUserData = (value, datatype) => {
  return {
    type: actionTypes.USERINFO_ADD,
    value,
    datatype
  }
}

//清空用户信息
export const clearData = () => {
  return {
    type: actionTypes.USERINFO_CLEARDATA,
  }
}
//登录成功更新用户信息
export const loginUserData = (userData) => {
  return {
    type: actionTypes.USERINFO_LOGIN,
    userData
  }
}

//点赞  type:1：点赞  2：取消点赞
export const updateDianzan = (type,dataId) => {
  return {
    type: actionTypes.USERINFO_DIANZAN,
    dianzantype:type,
    dataId:dataId
  }
}
