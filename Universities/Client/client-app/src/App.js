import logo from './logo.svg';
import './App.css';
import {Home} from './Components/Home'
import {Watchlist} from './Components/Watchlist'
import {Navigation} from './Components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <h3 className='m-3 d-flex justify-content-center'>
      reactttt
      </h3>
    </div>
    
    <Navigation/>

    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/watchlist' component={Watchlist}/>
    </Switch>

    </BrowserRouter>
  )
}

export default App;
