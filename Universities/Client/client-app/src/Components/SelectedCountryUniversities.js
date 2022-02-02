import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import endpoints from "../ApiEndpoints";

export default function SelectedCountryUniversities(props) {
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
                        </tr>
                        )})
                    }
                </tbody>
            </Table>
        </>
    );
}