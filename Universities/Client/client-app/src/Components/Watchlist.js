import React,{useState} from 'react';
import endpoints from "../ApiEndpoints";
import { Table } from "react-bootstrap";
import "./Styles/Watchlist.css";
export default function Watchlist(props) {

    function Export(){
        fetch(endpoints.exportWatchlist, {
            method: 'GET',
            headers: new Headers(
            {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            })
        })
            .then((response) => response.blob())
            .then(function(myBlob) {
                var objectURL = URL.createObjectURL(myBlob); 

                let downloadLink = document.createElement('a');
                downloadLink.href = objectURL;
                downloadLink.setAttribute('download', "Watchlist.xlsx");
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
              })
            .catch((error) => {
              console.error(error);
            });
    }

    return(
        <>
        <div className="export-container">
            <button className="export-btn" onClick={Export}>Download</button>
        </div>
          <div className='mt-5 d-flex justify-content-left'>
          <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.watchlist.map(x => {
                        return(
                            <>
                                <tr>
                                    <td>{x.id}</td>
                                    <td>{x.name}</td>
                                    <td>{x.alphaTwoCode}</td>
                                    <td>{x.country}</td>
                                    <td><a href={`${x.webPage}`}>{x.webPage}</a></td>
                                </tr>
                            </>
                        )})
                    }
                </tbody>
            </Table>
            </div>
        </>
    );
}