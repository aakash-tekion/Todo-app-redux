import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../../Styles/Auth.css'
import Navbar from '../Navbar/Navbar.js'
import { NavContext } from '../../context/NavContextProvider';
import bcrypt from 'bcryptjs'
class Login extends Component {
    static contextType = NavContext;
    constructor(props){
        super(props)
        this.state = {
            errorDisplay:false
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.updateErrorMessage = this.updateErrorMessage.bind(this); 
    }
    submitHandler(event){
        event.preventDefault();
        let userObj = {
            'username':event.target.username.value,
            'password':event.target.password.value
        }
        if(localStorage.getItem(userObj.username)){
            bcrypt.compare(userObj.password,JSON.parse(localStorage.getItem(userObj.username))['password'],(err,isMatch)=>{
                if(err){
                    this.props.logInFailure('Error')
                }
                else if(!isMatch){
                    this.props.logInFailure('Wrong password')
                }
                else{
                    this.props.logInSuccess(userObj)
                }
            })
        }
        else{
            this.props.logInFailure('User not found')
        }
        
        this.setState({
            errorDisplay:true
        })
    }
    updateErrorMessage(){
        this.setState({
            errorDisplay:false
        })
    }
    componentDidMount(){
        this.context.setPage('login')
    }
    
    render() {
        console.log(this.props)
        if(this.props.isAuthenticated){
            this.props.readTodo(this.props.userName)
            return <Redirect to='/todo' />
        }
        return (
            <div className='form-ui'>
                <Navbar/>
                <form className='form-container' onSubmit={this.submitHandler}>
                    <label className='form-label' htmlFor='name'>Username</label>
                    <input type='text' name='username' onClick={this.updateErrorMessage} id='name' className='form-input'/>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onClick={this.updateErrorMessage} className='form-input'/>
                    <p className='error-message'>{this.state.errorDisplay?this.props.errorMessage:<Link className='signup-link' to='/signup'>Create new account</Link>}</p>
                    <button className='form-submit-button'>Log in</button>
                </form>
            </div>
            
        )
    }
}
const mapStateToProps = state => {
    return{
        isAuthenticated:state.AuthReducer.isAuthenticated,
        userName:state.AuthReducer.username,
        errorMessage:state.AuthReducer.errorMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logInSuccess : (userObj) => {dispatch({type:'LOG_IN_SUCCESS',user:userObj})},
        logInFailure:(errorMessage)=>{dispatch({type:'LOG_IN_FAILURE',errorMessage})},
        readTodo:(username)=>{dispatch({type:'READ_TODO',username})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)