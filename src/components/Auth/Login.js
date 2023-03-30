import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../../Styles/Auth.css'
class Login extends Component {
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
        this.props.login(userObj);
        this.setState({
            errorDisplay:true
        })
    }
    updateErrorMessage(){
        this.setState({
            errorDisplay:false
        })
    }
    
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to='/todo' />
        }
        return (
            <form className='form-container' onSubmit={this.submitHandler}>
                <label className='form-label' htmlFor='name'>Username</label>
                <input type='text' name='username' id='name' className='form-input'/>
                <label className='form-label' htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' onClick={this.updateErrorMessage} className='form-input'/>
                <p className='error-message'>{this.state.errorDisplay?this.props.errorMessage:<Link className='signup-link' to='/signup'>Create new account</Link>}</p>
                <button className='form-submit-button'>Log in</button>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return{
        isAuthenticated:state.isAuthenticated,
        errorMessage:state.errorMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login : (userObj) => {dispatch({type:'log-in',user:userObj})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)