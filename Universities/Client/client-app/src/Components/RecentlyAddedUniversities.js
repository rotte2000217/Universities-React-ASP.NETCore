import { Table } from "react-bootstrap";

export default function RecentlyAddedUniversities(props) {

    return(
        <>
            <h3 className='h3-recent'>
                Recently added universities:
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
                    props.universities.map(x => {
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