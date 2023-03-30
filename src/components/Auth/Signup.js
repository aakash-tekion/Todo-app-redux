import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../Styles/Auth.css'
class Signup extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.submitHandler = this.submitHandler.bind(this)
    }
    submitHandler(event){
        event.preventDefault();
        let userObj = {
            'username':event.target.username.value,
            'password':event.target.password.value
        }
        this.props.addUser(userObj)
    }
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to='/todo'/>
        }
        return (
            <form className='form-container' onSubmit={this.submitHandler}>
                <label htmlFor='name' className='form-label'>Username</label>
                <input type='text' name='username' id='name' className='form-input' />
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' name='password' id='password' className='form-input' />
                <button className='form-submit-button'>Sign up</button>
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
        addUser : (userObj) => {dispatch({type:'add-user',user:userObj})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup)