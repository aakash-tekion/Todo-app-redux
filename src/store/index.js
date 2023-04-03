import {legacy_createStore as createStore} from 'redux';
import { combineReducers } from 'redux';
import AuthReducer from '../reducers/AuthReducer';
import TodoReducer from '../reducers/TodoReducer';
const reducerfn = combineReducers({
    AuthReducer,
    TodoReducer

})
const store = createStore(reducerfn)
console.log(store.getState())
export default store