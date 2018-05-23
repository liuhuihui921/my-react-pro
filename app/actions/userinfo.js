import * as actionTypes from 'constants/userinfo'

// export function update(data) {
//     return {
//         type: actionTypes.USERINFO_UPDATE,
//         data
//     }
// }

export const saveUserData = (value, datatype) => {
  return {
    type: actionTypes.USERINFO_ADD,
    value,
    datatype,
  }
}

export const clearData = () => {
  return {
    type: actionTypes.USERINFO_CLEARDATA,
  }
}

export const loginUserData = (userData) => {
  return {
    type: actionTypes.USERINFO_LOGIN,
    userData
  }
}
