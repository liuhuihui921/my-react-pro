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

//收藏/取消收藏 品牌
// export const collectionBrandAction = (type,dataId) => {
//   return {
//     type: actionTypes.USERINFO_COLLECTIONBRAND,
//     collectiontype:type,
//     dataId:dataId
//   }
// }
//收藏，取消收藏品牌
export const collectionBrandAction = (type,data) => {
  return {
    type: actionTypes.USERINFO_COLLECTIONBRAND,
    collectiontype:type,
    data:data
  }
}

//收藏，取消收藏设计
export const collectionDesignAction = (type,data) => {
  return {
    type: actionTypes.USERINFO_COLLECTIONDESIGN,
    collectiontype:type,
    data:data
  }
}

//关注/取消关注 用户
export const followUserAction = (type,data) => {
  return {
    type: actionTypes.USERINFO_FOLLOW,
    followtype:type,
    data:data
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: actionTypes.USERINFO_SAVEIMG,
    path
  }
}

//上传单品
export const saveDanpinImgAction = name => {
  return {
    type: actionTypes.USERINFO_SAVEDANPINIMG,
    name
  }
}
