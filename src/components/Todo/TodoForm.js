import React, { Component } from 'react'
import '../../Styles/Todo.css'
export default class TodoForm extends Component {
    constructor(props) {
        super(props);
    }
    submitHandler = (event) => {
        event.preventDefault();
        let todo = event.target.todo.value;
        if(this.props.buttonRef.current.classList.contains('fa-pen')){
            this.props.editTodoForm(todo)
        }else{
            this.props.addTodo(todo);
        }
        this.props.inputRef.current.value=''
    }
    render() {
        return (
            <form className='todo-form' onSubmit={this.submitHandler}>
                <input ref={this.props.inputRef} placeholder='Take control of your day with a to-do list ! ' type='text' name='todo' />
                <button type='submit' className='flex-row'><i ref={this.props.buttonRef} className="fa-solid fa-plus"></i></button>
            </form>
        )
    }
}
