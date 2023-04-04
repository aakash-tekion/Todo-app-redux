import './App.css';
import Todo from './components/Todo/Todo.js'
import Login from './components/Auth/Login.js'
import Signup from './components/Auth/Signup.js';
import { Route, Switch, Redirect } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import { NavContextProvider } from './context/NavContextProvider';
import { EditContextProvider } from './context/EditContextProvider';
export default function App() {
  return (

    <div className='App'>


      <NavContextProvider>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/todo'>
            <EditContextProvider>
              <Todo />
            </EditContextProvider>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </NavContextProvider>



    </div>

  )
}
