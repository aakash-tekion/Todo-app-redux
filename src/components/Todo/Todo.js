import React, { Component } from 'react'
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import '../../Styles/Todo.css'
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
class Todo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
    }
    chechIfPresent(todo){
        let bool = false;
        this.props.todos.forEach(item=>{
            if(item.data === todo){
                bool = true
            }
        })
        return bool;
    }
    completedHandler = (key) => {
        this.props.removeTodo(key);
    }
    addTodo = (event) => {
        event.preventDefault();
        let todo = event.target.todo.value;
        if(todo===''){
            return
        }
        let notFound = this.chechIfPresent(todo)
        if(!notFound){
            this.props.addTodo(todo);
        }
    }
    componentDidMount = () => {
        if(this.props.isAuthenticated){
            this.inputRef.current.focus();
        }
    }
    render() {
        if(!this.props.isAuthenticated){
            return <Redirect to='/login'/>
        }
        return (
            <div className='todo-container'>
                <Navbar/>
                <TodoForm inputRef = {this.inputRef} addTodo={this.addTodo} />
                <TodoList completedHandler = {this.completedHandler} todos = {this.props.todos} />
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        todos:state.todos,
        isAuthenticated:state.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTodo : (todo) => dispatch({type:'add-todo',item:todo}),
        removeTodo : (key) => dispatch({type:'remove-todo',key}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);