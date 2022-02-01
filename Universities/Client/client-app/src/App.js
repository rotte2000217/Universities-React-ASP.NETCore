import './App.css';
import {Home} from './Components/Home'
import {Watchlist} from './Components/Watchlist'
import {Navigation} from './Components/Navigation'
import Login from './Components/Login'
import Register from './Components/Register'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/watchlist' component={Watchlist}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Switch>

    </BrowserRouter>
  )
}

export default App;
