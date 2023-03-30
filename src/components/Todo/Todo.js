import React, { Component } from 'react'
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import '../../Styles/Todo.css'
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import { chechIfTodoExist } from '../../helper/index.js';
class Todo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
    }
    completedHandler = (key) => {
        this.props.updateTodo(key);
    }
    addTodoHandler = (todo) => {
        if(todo===''){
            return
        }
        let notFound = chechIfTodoExist(this.props.todos,todo)
        if(!notFound){
            this.props.addTodo(todo);
        }
    }
    removeTodoHandler = (key) =>{
        this.props.removeTodo(key)
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
                <TodoForm inputRef = {this.inputRef} addTodo={this.addTodoHandler}  />
                <TodoList completedHandler = {this.completedHandler} todos = {this.props.todos} removeTodo={this.removeTodoHandler} />
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
        updateTodo: (key) => dispatch({type:'update-todo',key})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);