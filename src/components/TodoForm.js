import React, { Component } from 'react'
import '../Styles/Todo.css'
export default class TodoForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className='todo-form' onSubmit={this.props.addTodo}>
                <input ref={this.props.inputRef} placeholder='Take control of your day with a to-do list ! ' type='text' name='todo' />
                <button type='submit' className='flex-row'><i className="fa-solid fa-plus"></i></button>
            </form>
        )
    }
}
