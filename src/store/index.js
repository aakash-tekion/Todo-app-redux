import {legacy_createStore as createStore} from 'redux';
import { nanoid } from 'nanoid';
import { sortTodos } from '../helper/index.js'
const initialState = {
    todos:[],
    username:'',
    isAuthenticated:false
}
const reducerfn = (state=initialState,action) =>{
    if(action.type==='add-todo'){
        let updatedTodos = sortTodos([...state.todos,{
            data:action.item,
            id:nanoid(),
            completed:0
        }])
        let userData = JSON.parse(localStorage.getItem(state.username))
        userData.todos = updatedTodos
        localStorage.setItem(state.username,JSON.stringify(userData))
        return {
            ...state,
            todos:updatedTodos
            
        }
    }
    else if(action.type==='remove-todo'){
        let updatedTodos = state.todos.map(item=>{
            if(item.id === action.key){
                item.completed = 1
            }
            return item
        })
        updatedTodos = sortTodos(updatedTodos)
        let userData = JSON.parse(localStorage.getItem(state.username))
        userData.todos = updatedTodos
        localStorage.setItem(state.username,JSON.stringify(userData))
        return{
            ...state,
            todos: updatedTodos
        }
    }
    else if(action.type === 'add-user'){
        action.user['todos'] = []
        localStorage.setItem(action.user.username,JSON.stringify(action.user))
        return {
            isAuthenticated:true,
            username:action.user.username,
            todos:[]
        }
    }
    else if(action.type === 'log-in'){
        let userData = JSON.parse(localStorage.getItem(action.user.username))
        console.log(userData)
        if(userData){
            if(userData.password !== action.user.password){ 
                return {
                    isAuthenticated:false,
                    todos:[],
                    username:''
                }
            }
            else{
                return {
                    isAuthenticated:true,
                    todos:userData.todos,
                    username:userData.username
                }
            }
        }
        return{
            isAuthenticated:false,
            todos:[],
            username:''
        }
        
    }
    else if(action.type === 'log-out'){
        return {
            isAuthenticated:false,
            todos:[],
            username:''
        }
    }
    return state
}
export const store = createStore(reducerfn)

