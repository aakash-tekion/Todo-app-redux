import './App.css';
import Todo from './components/Todo/Todo.js'
import Login from './components/Auth/Login.js'
import Signup from './components/Auth/Signup.js';
import { Route, Switch, Redirect } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
export default function App() {
  return (
    <div className='App'>
      <Switch>
      <Route exact path='/'>
        <Redirect to='/login' />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/todo'>
        <Todo />
      </Route>
      <Route path="*">
        <PageNotFound/>
      </Route>
    </Switch>
    </div>
    
  )
}
