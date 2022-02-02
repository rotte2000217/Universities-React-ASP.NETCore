import React,{Component} from 'react';
import endpoints from "../ApiEndpoints";

export class Home extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
          data : []
        };
      }
      
    componentWillMount() {
        this.renderMyData();
    }

    renderMyData(){
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
                this.setState({ data : responseJson })
            }).catch((error) => {
              console.error(error);
            });
    }

    render(){
        return(
            <div className='mt-5 d-flex justify-content-left'>
                <div>
                    <p>
                        {this.props.selectedCountry}
                    </p>
                    {
                        this.state.data.map(x => {return <p>{x.country} - {x.name}</p>})
                    }
                </div>
            </div>
        )
    }
}