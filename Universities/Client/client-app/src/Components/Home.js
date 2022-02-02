import React,{useEffect, useState } from 'react';
import endpoints from "../ApiEndpoints";

export default function Home(props){
      
    const [lock, setLock] = useState(0);
    const [universities, setUniversities] = useState([]);

    useEffect (() => {
        renderMyData();
    }, [lock])

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
        let selectedCountry = props.selectedCountry;
        return(
            <div className='mt-5 d-flex justify-content-left'>
                <div>
                    <p>
                        {selectedCountry}
                    </p>
                    {
                        universities.map(x => {return <p>{x.country} - {x.name}</p>})
                    }
                </div>
            </div>
        );
}