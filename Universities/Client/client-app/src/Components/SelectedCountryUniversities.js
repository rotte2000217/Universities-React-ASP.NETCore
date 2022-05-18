import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import endpoints from "../ApiEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

library.add(faBookmark);

export default function SelectedCountryUniversities(props) {

    function addToWatchlist(universityId){
        fetch(endpoints.addToWatchlist, {
            method: 'POST',
            headers: new Headers(
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }),
            body: JSON.stringify(universityId)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(responseJson.responseMessage);
                props.setWatchlist(responseJson.universities);
            })
            .catch((error) => {
              console.error(error);
            });
    }

    return(
        <>
            <h3 className='h3-recent'>
                Universities in {props.selectedCountry}:
            </h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Website</th>
                        <th>Add to watchlist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.selectedUniversities.map(x => {
                        return(
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.alphaTwoCode}</td>
                                <td>{x.country}</td>
                                <td>{x.webPage}</td>
                                <button className="watchlist-btn" onClick={() => addToWatchlist(x.id)}><FontAwesomeIcon icon="bookmark" /></button>
                            </tr>
                        )})
                    }
                </tbody>
            </Table>
        </>
    );
}