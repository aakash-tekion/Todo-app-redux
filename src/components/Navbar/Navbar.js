import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../Styles/Navbar.css'
class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='nav-left'>
            <p className='nav-header'>My Todo App</p>
        </div>
        <div className='nav-right'>
            <p>{this.props.username}</p>
            <a className='logout-btn' onClick={this.props.logout}>log out</a>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => {
    return {
        username:state.username
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logout:()=>{dispatch({type:'log-out'})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
