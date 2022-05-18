import React,{useState} from 'react';
import endpoints from "../ApiEndpoints";
import { Table } from "react-bootstrap";
export default function Watchlist(props) {
    return(
        <>
          <div className='mt-5 d-flex justify-content-left'>
          <Table striped bordered hover>
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
                                    <td>{x.webPage}</td>
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