import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavContext } from '../../context/NavContextProvider';
import '../../Styles/Auth.css'
import Navbar from '../Navbar/Navbar.js'
class Signup extends Component {
    static contextType = NavContext
    constructor(props){
        super(props)
        this.state={
            errorDisplay:false
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.updateErrorMessage = this.updateErrorMessage.bind(this); 
    }
    submitHandler(event){
        event.preventDefault();
        let userObj = {
            'username':event.target.username.value,
            'password':event.target.password.value,
        }
        this.props.addUser(userObj)
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
        this.context.setPage('signup')
    }
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to='/todo'/>
        }
        return (
            <div className='form-ui'>
            <Navbar/>
            <form className='form-container' onSubmit={this.submitHandler}>
                <label htmlFor='name' className='form-label'>Username</label>
                <input type='text' onClick={this.updateErrorMessage} name='username' id='name' className='form-input' />
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' onClick={this.updateErrorMessage} name='password' id='password' className='form-input' />
                <p className='error-message'>{this.state.errorDisplay?this.props.errorMessage:''}</p>
                <button className='form-submit-button'>Sign up</button>
            </form>
            </div>
            
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
        addUser : (userObj) => {dispatch({type:'add-user',user:userObj})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup)