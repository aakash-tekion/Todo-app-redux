import React, { Component } from 'react'
import '../../Styles/Todo.css'
import { EditContext } from '../../context/EditContextProvider';
export default class TodoList extends Component {
    static contextType = EditContext
    constructor(props) {
        super(props);
        this.todoRefList = {}
    }
    refHandler(todo){
        let deleteIcon = document.createElement('i')
        deleteIcon.className = "fa-solid fa-trash-can"
        let closeIcon = document.createElement('i')
        closeIcon.className = "fa-solid fa-xmark"
        deleteIcon.addEventListener('click',()=>{
            this.props.removeTodo(todo.id)
        })
        closeIcon.addEventListener('click',()=>{
            this.todoRefList[todo.id].current.innerHTML='';
            this.todoRefList[todo.id].current.classList.remove('todo-icon-pop')
            let optionIcon = document.createElement('i')
            optionIcon.className = "fa-solid fa-ellipsis-vertical"
            optionIcon.classList.add('dot-icon')
            optionIcon.addEventListener('click',()=>{
                this.refHandler(todo)
            })
            this.todoRefList[todo.id].current.appendChild(optionIcon)
        })
        // console.log(index)
        this.todoRefList[todo.id].current.innerHTML = ''
        if(todo.completed){
            this.todoRefList[todo.id].current.appendChild(deleteIcon)
            this.todoRefList[todo.id].current.appendChild(closeIcon)
        }
        else{
            let editIcon = document.createElement('i')
            editIcon.className="fa-solid fa-pen"
            editIcon.addEventListener('click',()=>{
                // this.props.removeTodo(todo.id)
                // console.log(todo.id)
                this.context.setEditKey(todo.id)
                this.props.editTodo(todo)
            })
            this.todoRefList[todo.id].current.appendChild(editIcon)
            this.todoRefList[todo.id].current.appendChild(deleteIcon)
            this.todoRefList[todo.id].current.appendChild(closeIcon)
        }
        this.todoRefList[todo.id].current.classList.add('todo-icon-pop')
        
    }
   
    
    render() {
        this.todoRefList={}
        return (
            <ul className='todo-list'>
                {console.log('re render',this.todoRefList)}
                { this.props.todos.length !== 0?
                    
                    this.props.todos.map((todo) => {
                        let itemRef = React.createRef() 
                        let inputElement = todo.completed?<input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }} checked />:<input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }}/>
                        let todoClassname = todo.completed?'todo-content completed':'todo-content'
                        this.todoRefList[todo.id]= itemRef 
                        return <li className='todo-item flex-row' key={todo.id}>{inputElement}<span className={todoClassname}>{todo.data}</span><span className='todo-icon flex-row' ref={itemRef}><i className="fa-solid fa-ellipsis-vertical dot-icon" onClick={()=>{this.refHandler(todo)}}></i></span></li>

                    })
                    :
                    <p className='no-todos'>No todos</p>
                }
            </ul>

        )
    }
    
}

