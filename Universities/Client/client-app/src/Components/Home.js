import React,{useEffect, useState } from 'react';
import endpoints from "../ApiEndpoints";
import RecentlyAddedUniversities from './RecentlyAddedUniversities';
import SelectedCountryUniversities from './SelectedCountryUniversities';

export default function Home(props){
      
    const [lock, setLock] = useState(0);
    const [universities, setUniversities] = useState([]);

    useEffect (() => {
        renderMyData();
    }, [])

    function renderMyData(){
        fetch(endpoints.homePage, {
            method: 'GET',
            headers: new Headers(
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setUniversities(responseJson);
                return responseJson;
            })
            .catch((error) => {
              console.error(error);
            });
    }
        const selectedCountry = props.selectedCountry;
        let selectedUniversities = props.universitiesForSelectedCountry;
        return(
            <div className='mt-5 d-flex justify-content-left'>
                <div>
                    {
                        (selectedCountry === "")
                        ? <RecentlyAddedUniversities universities={universities}/>
                        : <SelectedCountryUniversities selectedUniversities={selectedUniversities} selectedCountry={selectedCountry} />
                    }
                    {/* <p>
                        {selectedCountry}
                        <SelectedCountryUniversities selectedCountry={selectedCountry} />
                    </p> */}

                    {/* <RecentlyAddedUniversities universities={universities}/> */}
                </div>
            </div>
        );
}