import React, { Component, createContext } from 'react'
export const EditContext = createContext()

export class EditContextProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      editKey:''
    }
    this.EditKey = this.EditKey.bind(this)
  }
  EditKey(key){
    
    this.setState({
      editKey:key
    })
  }
  render() {
    console.log(this.props)
    return (
      <EditContext.Provider value={{
        editKey:this.state.editKey,
        setEditKey:this.EditKey

      }}>
        {this.props.children}
      </EditContext.Provider>
    )
  }
}

