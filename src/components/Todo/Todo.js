import React, { Component } from 'react'
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import '../../Styles/Todo.css'
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import { chechIfTodoExist } from '../../helper/index.js';
import { EditContext } from '../../context/EditContextProvider.js';
class Todo extends Component {
    static contextType = EditContext
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        this.todoButton = React.createRef();
    }
    completedHandler = (key) => {
        this.props.updateTodo(key,this.props.username);
    }
    addTodoHandler = (todo) => {
        if(todo===''){
            return
        }
        let notFound = chechIfTodoExist(this.props.todos,todo)
        if(!notFound){
            this.props.addTodo(todo,this.props.username);
        }
    }
    removeTodoHandler = (key) =>{
        this.props.removeTodo(key,this.props.username)
    }
    componentDidMount = () => {
        if(this.props.isAuthenticated){
            this.inputRef.current.focus();
        }
    }
    editTodoHandler = (todo) => {
        this.inputRef.current.value = todo.data
        this.todoButton.current.className = 'fa-solid fa-pen'
      }
    editTodoFormHandler = (newContent) => {
        this.props.editTodo(this.context.editKey, newContent,this.props.username)
        this.todoButton.current.className = 'fa-solid fa-plus'
    }
   
    render() {
        console.log(this.props)
        if(!this.props.isAuthenticated){
            return <Redirect to='/login'/>
        }
        return (
            <div className='todo-ui'>
                <Navbar/>
                <div className='todo-container'>
                    <TodoForm inputRef = {this.inputRef} buttonRef={this.todoButton} editTodoForm={this.editTodoFormHandler} addTodo={this.addTodoHandler}  />
                    <TodoList completedHandler = {this.completedHandler} editTodo={this.editTodoHandler} todos = {this.props.todos} removeTodo={this.removeTodoHandler} />
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        todos:state.TodoReducer.todos,
        isAuthenticated:state.AuthReducer.isAuthenticated,
        username:state.AuthReducer.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTodo : (todo,username) => dispatch({type:'ADD_TODO',item:todo,username}),
        removeTodo : (key,username) => dispatch({type:'REMOVE_TODO',key,username}),
        updateTodo : (key,username) => dispatch({type:'UPDATE_TODO',key,username}),
        editTodo : (key,newContent,username) => dispatch({type:'EDIT_TODO',key,newContent,username})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);