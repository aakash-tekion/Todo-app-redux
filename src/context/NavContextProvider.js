import React, { Component } from 'react'
import { createContext } from 'react'
export const NavContext = createContext()
export class NavContextProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            page:null
        }
    }
    setPage=(currentPage)=>{
        this.setState({
            page:currentPage
        })
    }
  render() {
    return (
      <NavContext.Provider value = {{page:this.state.page,setPage:this.setPage}}>
        {this.props.children}
      </NavContext.Provider>
    )
  }
}

