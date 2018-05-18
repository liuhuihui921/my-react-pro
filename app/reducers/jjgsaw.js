import * as actionTypes from 'constants/jjgsaw'

const initialState = {
  'id':0,
  'auter':'',
  'face':"",
  'img':"",
  'zan':0,
  'ctime':'',
  'zanUser':[]
};

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.JJGSAW_LIST:
            return action.data;
        case actionTypes.JJGSAW_DIANZAN:
            return state.map((item)=>{
              if(item.id == action.dataId){
                const itemNew = item.zanUser.concat(action.userId)
                item.zanUser = itemNew
                return item
              }else{
                return item
              }
            });
        default:
            return state
    }
}
