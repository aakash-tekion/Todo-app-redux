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
                        if (todo.completed) {
                            return <li className='todo-item flex-row completed' key={todo.id}><input type="checkbox" className='checkbox' value={todo.id} checked disabled />{todo.data}</li>
                        }
                        else {
                            return <li className='todo-item flex-row' key={todo.id}><input type="checkbox" className='checkbox' onClick={() => { this.props.completedHandler(todo.id) }} value={todo.id} />{todo.data}</li>
                        }
                    })
                }
            </ul>

        )
    }
}
