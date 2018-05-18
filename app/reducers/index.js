import { combineReducers } from 'redux'
import userinfo from './userinfo';
import store from './store';
import jjgsaw from './jjgsaw';

export default combineReducers({
    userinfo,
    store,
    jjgsaw
})
