import React, { Component } from 'react'
import '../../Styles/Todo.css'
export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.todoRefList = []
    }
    refHandler(index,todo){
        let deleteIcon = document.createElement('i')
        deleteIcon.className = "fa-solid fa-trash-can"
        let closeIcon = document.createElement('i')
        closeIcon.className = "fa-solid fa-xmark"
        deleteIcon.addEventListener('click',()=>{
            this.props.removeTodo(todo.id)
        })
        closeIcon.addEventListener('click',()=>{
            this.todoRefList[index].current.innerHTML='';
            this.todoRefList[index].current.classList.remove('todo-icon-pop')
            let optionIcon = document.createElement('i')
            optionIcon.className = "fa-solid fa-ellipsis-vertical"
            optionIcon.addEventListener('click',()=>{
                this.refHandler(index,todo)
            })
            this.todoRefList[index].current.appendChild(optionIcon)
        })
        this.todoRefList[index].current.innerHTML = ''
        if(todo.completed){
            this.todoRefList[index].current.appendChild(deleteIcon)
            this.todoRefList[index].current.appendChild(closeIcon)
        }
        else{
            let editIcon = document.createElement('i')
            editIcon.className="fa-solid fa-pen"
            editIcon.addEventListener('click',()=>{
                // this.props.removeTodo(todo.id)
                this.props.editTodo(todo)
            })
            this.todoRefList[index].current.appendChild(editIcon)
            this.todoRefList[index].current.appendChild(deleteIcon)
            this.todoRefList[index].current.appendChild(closeIcon)
        }
        this.todoRefList[index].current.classList.add('todo-icon-pop')
        
    }
   
    
    render() {
        this.todoRefList=[]
        return (
            <ul className='todo-list'>
                { 
                    this.props.todos.map((todo,index) => {
                        let itemRef = React.createRef() 
                        let inputElement = todo.completed?<input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }} checked />:<input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }}/>
                        let todoClassname = todo.completed?'todo-content completed':'todo-content'
                        this.todoRefList.push(itemRef)
                        return <li className='todo-item flex-row' key={todo.id}>{inputElement}<span className={todoClassname}>{todo.data}</span><span className='todo-icon flex-row' ref={itemRef}><i className="fa-solid fa-ellipsis-vertical" onClick={()=>{this.refHandler(index,todo)}}></i></span></li>

                    })
                }
            </ul>

        )
    }
    
}

