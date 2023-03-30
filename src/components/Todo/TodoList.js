import React, { Component } from 'react'
import '../../Styles/Todo.css'
export default class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className='todo-list'>
                {
                    this.props.todos.map(todo => {
                        let element = todo.completed ? <li className='todo-item flex-row' key={todo.id}><input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }} checked /><span className='todo-content completed'>{todo.data}</span><i className="fa-sharp fa-solid fa-delete-left delete-icon" onClick={()=>{this.props.removeTodo(todo.id)}}></i></li>:<li className='todo-item flex-row' key={todo.id}><input type="checkbox" className='checkbox' value={todo.id} onClick={() => { this.props.completedHandler(todo.id) }} /><span className='todo-content'>{todo.data}</span><i className="fa-sharp fa-solid fa-delete-left delete-icon" onClick={()=>{this.props.removeTodo(todo.id)}}></i></li>
                        return element;
                    })
                }
            </ul>

        )
    }
}
