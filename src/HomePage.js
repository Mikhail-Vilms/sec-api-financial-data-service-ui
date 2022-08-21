import {Component} from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

export class HomePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            listOfCompanies: []
        }
    }

    componentDidMount(){
        this.fetchListOfCompanies();
    }

    fetchListOfCompanies(){ 
        let targetUrl = "https://lyropdpvy6.execute-api.us-west-2.amazonaws.com/dev/list-of-companies";
        fetch(targetUrl)
            .then(response => {
                
                return response.json();
            })            
            .then(myJson => {
                
                this.setState({listOfCompanies:myJson});
            });
    }

    renderCompanyItems(){
        // let numberOfColumns = 6;
        // let numberOfRows = this.state.listOfCompanies.length / 6;


        return (
            this.state.listOfCompanies.map((company) => {
                return (<div class="col">
                        <p><b><small>
                            <Link to={{pathname:`/financials/${company.cikNumber}`, state: { cikNumber: company.cikNumber }}} >
                                {company.sortKey}
                            </Link>
                        </small></b></p>
                    </div>)
            })
        )
    }

    render(){
        return (
            <div className="container">
                <div class="row">
                    {this.renderCompanyItems()}
                </div>
            </div>
        );
    }
}