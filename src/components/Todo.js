import React, { Component } from 'react'
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import '../Styles/Todo.css'
class Todo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        console.log(this.prop)
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
        this.props.updateTodo(); /* Doubt */
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
        this.inputRef.current.focus();
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(prevProps.todos !== this.props.todos){
            this.props.updateTodo();
        }
    }
    
    render() {
        return (
            <div className='todo-container'>
                <TodoForm inputRef = {this.inputRef} addTodo={this.addTodo} />
                <TodoList completedHandler = {this.completedHandler} todos = {this.props.todos} />
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        todos:state.todos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTodo : (todo) => dispatch({type:'add-todo',item:todo}),
        removeTodo : (key) => dispatch({type:'remove-todo',key}),
        updateTodo : () => dispatch({type:'update-todo'})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo);