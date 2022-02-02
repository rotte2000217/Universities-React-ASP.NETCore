import './App.css';
import React,{useState} from 'react';
import {Home} from './Components/Home'
import {Watchlist} from './Components/Watchlist'
import Navigation from './Components/Navigation'
import Login from './Components/Login'
import Register from './Components/Register'
import authService from './Services/AuthService';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState((localStorage.getItem('token') === null) ? 'false' : 'true');
  const [didUserCreateAccount, setDidUserCreateAccount] = useState('false');

  return (
    <BrowserRouter>
    <Navigation isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/watchlist' component={Watchlist}/>
      <Route path='/login'
        render={() =>
          isUserLoggedIn === "false"
          ? (<Login isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />)
          : (<Redirect to="/" />)}
      />
      <Route path='/register' component={Register}/>
    </Switch>

    </BrowserRouter>
  )
}

export default App;
