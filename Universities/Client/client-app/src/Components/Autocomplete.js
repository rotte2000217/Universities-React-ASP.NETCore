import React, { Fragment, useState } from "react";
import './Styles/Autocomplete.css'
import endpoints from "../ApiEndpoints";

export default function Autocomplete(props) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  function onChange(e) {
    const suggestions = props.wordsSuggestions;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  function onClick(e){
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    props.setSelectedCountry(e.currentTarget.innerText);
    setUniverities(e.currentTarget.innerText);
  };

  function setUniverities(country){
        fetch(`${endpoints.getUniversitiesByCountry}?country=${country}`, {
            method: 'GET',
            headers: new Headers(
              {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
              })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('UNIS-SET')
                console.log(responseJson.value);
                props.setUniversitiesForSelectedCountry(responseJson.value);
            })
            .catch((error) => {
              console.log(error);
            });
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
  
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }
      return (
        <Fragment>
          <input
            id="country-input"
            className="input-auto"
            autoComplete="off"
            placeholder="Search for country.."
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {suggestionsListComponent}
        </Fragment>
      );
    }