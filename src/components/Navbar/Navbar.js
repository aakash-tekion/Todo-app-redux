import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../Styles/Navbar.css'
import { NavLink } from 'react-router-dom'
import { NavContext } from '../../context/NavContextProvider'
class Navbar extends Component {
  static contextType = NavContext
  render() {
    return (
      <nav className='navbar'>
        <div className='nav-left'>
            <p className='nav-header'>My Todo App</p>
        </div>
        <div className='nav-right'>
          {
            
            this.props.isAuthenticated?<><p>{this.props.username}</p>
            <a className='logout-btn' onClick={this.props.logout}>log out</a></>
            :
            <>
            {
              this.context.page === 'signup' ? 
              <>
              <NavLink className='navlink' to='/login'>Log in</NavLink>
              <NavLink className='navlink active' to='/signup'>Sign up</NavLink>
              </>
              :
              <>
              <NavLink className='navlink active' to='/login'>Log in</NavLink>
              <NavLink className='navlink' to='/signup'>Sign up</NavLink>
              </>
            }
            
            
            </>
          }
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => {
    return {
        username:state.AuthReducer.username,
        isAuthenticated:state.AuthReducer.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logout:()=>{dispatch({type:'LOG_OUT'})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
