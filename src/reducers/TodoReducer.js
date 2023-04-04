import { nanoid } from 'nanoid';
import { sortTodos,chechIfTodoExist } from '../helper/index.js'
const initialState = {
    todos: []
}
const TodoReducer = (state = initialState, action)=>{
    let updatedTodos,userData;
    switch (action.type) {
        case 'ADD_TODO':
            updatedTodos = sortTodos([...state.todos, {
                data: action.item,
                id: nanoid(),
                completed: false
            }])
            userData = JSON.parse(localStorage.getItem(action.username))
            userData.todos = updatedTodos
            localStorage.setItem(action.username, JSON.stringify(userData))
            return {
                todos: updatedTodos
            }
        case 'READ_TODO':
            return {
                todos:JSON.parse(localStorage.getItem(action.username))['todos']
            }

        case 'UPDATE_TODO':
            updatedTodos = state.todos.map(item => {
                if (item.id === action.key) {
                    item.completed = !item.completed
                }
                return item
            })
            updatedTodos = sortTodos(updatedTodos)
            userData = JSON.parse(localStorage.getItem(action.username))
            userData.todos = updatedTodos
            localStorage.setItem(action.username, JSON.stringify(userData))
            return {
                todos: updatedTodos
            }
        case 'REMOVE_TODO':
            updatedTodos = state.todos.filter(item => {
                return item.id !== action.key
            })
            updatedTodos = sortTodos(updatedTodos)
            userData = JSON.parse(localStorage.getItem(action.username))
            userData.todos = updatedTodos
            localStorage.setItem(action.username, JSON.stringify(userData))
            return {
                todos: updatedTodos
            }
        case 'EDIT_TODO':
            let bool = chechIfTodoExist(state.todos, action.newContent, action.key)
            if (!bool) {
                // conso
                updatedTodos = state.todos.map(item => {
                    if (item.id === action.key) {
                        item.data = action.newContent
                    }
                    return item
                })
                updatedTodos = sortTodos(updatedTodos)
                userData = JSON.parse(localStorage.getItem(action.username))
                userData.todos = updatedTodos
                localStorage.setItem(action.username, JSON.stringify(userData))
                return {

                    todos: updatedTodos
                }
            }
            return state
        default:
            return state


    }
}
export default TodoReducer;

