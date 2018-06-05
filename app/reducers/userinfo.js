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
  mycollection:{
    design:[
      {id:1,title:'设计',content:'设计介绍介绍',auter:'Daisy90',img:'http://dummyimage.com/130X170/dfd29b',collectionStatus:true},
      {id:2,title:'设计2',content:'设计2介绍介绍',auter:'Daisy91',img:'http://dummyimage.com/130X170/dfd29b',collectionStatus:true}
    ],
    danpin:[],
    brand:[]
  },//我的收藏
  myfollow:[]//我关注的
};
let danpinCount =  1;

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_ADD:
          return {...state,...{[action.datatype]: action.value}};
        case actionTypes.USERINFO_SAVEIMG:
          return {...state,...{face: action.path}};

        case actionTypes.USERINFO_SAVEDANPINIMG://上传单品
          let danpin = {id:danpinCount,name:action.name,auter:'Danpin90',path:'http://dummyimage.com/130X170/dfd29b',collectionStatus:true};
          let mycollectionNew  = {...state.mycollection,danpin:state.mycollection.danpin.concat(danpin)};
          danpinCount++;
          //concat不改变原数组
          return {...state,mycollection:mycollectionNew}
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
        case actionTypes.USERINFO_COLLECTIONBRAND:
          if(action.collectiontype == 1)//收藏
          {
            let mycollectionNew  = {...state.mycollection,brand:state.mycollection.brand.concat(action.data)};
            //concat不改变原数组
            return {...state,mycollection:mycollectionNew}
            // return {...state,mycollection:state.mycollection.concat(action.dataId)}
          }else{//取消收藏
            let mycollectionNew  = {...state.mycollection,brand:state.mycollection.brand.filter(item => item.id!==action.data.id)};
            return {...state,mycollection:mycollectionNew}
            // return {...state,mycollection:state.mycollection.filter(item => item!==action.dataId)}
          }
        case actionTypes.USERINFO_FOLLOW:
          if(action.followtype == 1)//关注
          {
            //concat不改变原数组
            return {...state,myfollow:state.myfollow.concat(action.data)}
          }else{//取消关注
            return {...state,myfollow:state.myfollow.filter(item => item.id!==action.data.id)}
          }
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state
    }
}
