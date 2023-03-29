import {legacy_createStore as createStore} from 'redux';
import { nanoid } from 'nanoid';
const initialState = {
    todos:[]
}
const reducerfn = (state=initialState,action) =>{
    if(action.type==='add-todo'){
        return {
            todos:[...state.todos,{
                data:action.item,
                id:nanoid(),
                completed:0
            }]
        }
    }
    else if(action.type==='remove-todo'){
        console.log(action)
        let updatedTodos = state.todos.map(item=>{
            if(item.id === action.key){
                item.completed = 1
            }
            return item
        })

        return{
            todos: updatedTodos
        }
    }
    else if(action.type === 'update-todo'){
        console.log(action)
        state.todos.sort(function(a,b){ return a.completed-b.completed })
        console.log(state.todos)
        return {
            todos:state.todos
        }
    }
    return state
}
export const store = createStore(reducerfn)

