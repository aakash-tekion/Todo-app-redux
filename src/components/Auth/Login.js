import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../Styles/Auth.css'
class Login extends Component {
    constructor(props){
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
    }
    submitHandler(event){
        event.preventDefault();
        let userObj = {
            'username':event.target.username.value,
            'password':event.target.password.value
        }
        this.props.login(userObj)
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
                <input type='password' id='password' name='password' className='form-input'/>
                <button className='form-submit-button'>Log in</button>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return{
        isAuthenticated:state.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login : (userObj) => {dispatch({type:'log-in',user:userObj})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)