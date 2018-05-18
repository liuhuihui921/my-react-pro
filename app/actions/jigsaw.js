import * as actionTypes from 'constants/jjgsaw';

export function listSaw(data){
    return {
        type : actionTypes.JJGSAW_LIST,
        data
    }
}

export function dianzan(dataId,userId){
    return {
        type : actionTypes.JJGSAW_DIANZAN,
        dataId,
        userId
    }
}
