import {legacy_createStore as createStore} from 'redux';
import { nanoid } from 'nanoid';
import { sortTodos,chechIfTodoExist } from '../helper/index.js'
const initialState = {
    todos:[],
    username:'',
    isAuthenticated:false,
    errorMessage:''
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
    else if(action.type==='update-todo'){
        let updatedTodos = state.todos.map(item=>{
            if(item.id === action.key){
                item.completed = item.completed === 1?0:1
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
    else if(action.type==='remove-todo'){
        let updatedTodos = state.todos.filter(item=>{
            return item.id!==action.key
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
    else if(action.type ==='edit-todo'){
        console.log("Exist",action)
        let bool = chechIfTodoExist(state.todos,action.newContent,action.key)
        console.log(bool)
        if(!bool){
            let updatedTodos = state.todos.map(item=>{
                if(item.id === action.key){
                    item.data = action.newContent
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
        return state
        
    }
    else if(action.type === 'add-user'){
        action.user['todos'] = []
        if(localStorage.getItem(action.user.username)){
            return {
                isAuthenticated:false,
                username:'',
                todos:[],
                errorMessage:'User already exist'
            }
        }
        else{
            localStorage.setItem(action.user.username,JSON.stringify(action.user))
            return {
                isAuthenticated:true,
                username:action.user.username,
                todos:[],
                errorMessage:''
            }

        }
        
    }
    else if(action.type === 'log-in'){
        let userData = JSON.parse(localStorage.getItem(action.user.username))
        
        if(userData){
            if(userData.password !== action.user.password){ 
                return {
                    isAuthenticated:false,
                    todos:[],
                    username:'',
                    errorMessage:'Wrong password'
                }
            }
            else{
                return {
                    isAuthenticated:true,
                    todos:userData.todos,
                    username:userData.username,
                    errorMessage:''
                }
            }
        }
        return{
            isAuthenticated:false,
            todos:[],
            username:'',
            errorMessage:'No user found'
        }
        
    }
    else if(action.type === 'log-out'){
        return {
            isAuthenticated:false,
            todos:[],
            username:'',
            errorMessage:''
        }
    }
    return state
}
export const store = createStore(reducerfn)

