import * as actionTypes from 'constants/userinfo'

const initialState = {
  userId:'',
  nickName:'',
  phone:'',
  password:'',
  face:'',
  sex:'',
  job:'',
  desc:'',
  mydesign:[],//我的设计
  mycollection:[],//我的收藏
  myfollow:[]//我关注的
};

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_ADD:
          return {...state,...{[action.datatype]: action.value}};
        case actionTypes.USERINFO_CLEARDATA:
          return {...state,...{nickName:'',phone:'',password:''}};
        case actionTypes.USERINFO_LOGIN:
          return {...state,...action.userData};
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state
    }
}
