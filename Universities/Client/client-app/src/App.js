import './App.css';
import React,{useEffect, useState} from 'react';
import {Home} from './Components/Home'
import {Watchlist} from './Components/Watchlist'
import Navigation from './Components/Navigation'
import Login from './Components/Login'
import Register from './Components/Register'
import Autocomplete from "./Components/Autocomplete";
import endpoints from "./ApiEndpoints"

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState((localStorage.getItem('token') === null) ? 'false' : 'true');
  const [wordsSuggestions, setWordsSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(async() => {
      const array = await getWords();
      const wordsData = array.value;
      await setWordsSuggestions(wordsData);
  }, []);

  const getWords = async () => {
    const url = endpoints.getCountries;
    const res = await fetch(url, {
      method: "GET"
    });
    return await res.json();
  };
  
  return (
    <>
    <BrowserRouter>
    <Navigation isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
    
    <Switch>

      <Route path='/' exact 
      render={() =>
        isUserLoggedIn === "true"
        ? (<>
          <Autocomplete selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} suggestions={wordsSuggestions}/>
          <Home selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
          </>)
        : (<Redirect to="/login" />)}/>

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
    </>
  )
}

export default App;
