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
  dianzan:[1],//我点赞的拼图id
  mydesign:[],//我的设计
  mycollection:[],//我的收藏
  myfollow:[]//我关注的
};

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_ADD:
          return {...state,...{[action.datatype]: action.value}};
        case actionTypes.USERINFO_CLEARDATA:
          // return {...state,...{nickName:'',phone:'',password:''}};
          return {...state,...initialState};
        case actionTypes.USERINFO_LOGIN:
          return {...state,...action.userData};
        case actionTypes.USERINFO_DIANZAN:
            if(action.dianzantype == 1)//点赞
            {
              //concat不改变原数组
              return {...state,dianzan:state.dianzan.concat(action.dataId)}
            }else{//取消点赞
              return {...state,dianzan:state.dianzan.filter(item => item!==action.dataId)}
            }
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state
    }
}
