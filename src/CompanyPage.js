import {Component} from "react";
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

export class CompanyPage extends Component{
    constructor(props){
        super(props);

        let locationPathname = window.location.pathname;
        let pathArr = locationPathname.split("/");
        const cikNumber = pathArr[2];
        
        this.state = {
            cikNumber: cikNumber,
            companyInfo: null
        };
    }

    componentDidMount() {
        this.fetchCompanyInfo();
    }

    fetchCompanyInfo(){
        let targetUrl = "https://lyropdpvy6.execute-api.us-west-2.amazonaws.com/dev/list-of-companies/" + this.state.cikNumber;
        fetch(targetUrl)
            .then(response => {
                return response.json();
            })            
            .then(myJson => {
                console.log("~~~myJson: " + myJson);
                this.setState({companyInfo:myJson});
            });
    }

    render(){
        if (this.state.companyInfo === null){
            return (
                <div className="container">
                    <div className="row">
                        Loading...
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row border-bottom">
                    Title: {this.state.companyInfo['title']}
                </div>
                <div className="row border-bottom">
                   Ticker Symbol: {this.state.companyInfo['cikNumber']}
                </div>
                <div className="row border-bottom">
                   Cik Number: {this.state.companyInfo['sortKey']}
                </div>
                <div className="row border-bottom px-3 py-1">
                    <div class="col-sm d-flex justify-content-center">                        
                        <NavLink className="btn btn-outline-dark btn-sm" to={`/financials/${this.state.cikNumber}/balance-sheet`}>
                            Balance Sheet
                        </NavLink>
                    </div>
                    <div class="col-sm d-flex justify-content-center">                        
                        <NavLink className="btn btn-outline-dark btn-sm" to={`/financials/${this.state.cikNumber}/income-statement`}>
                            Income Statement
                        </NavLink></div>
                    <div class="col-sm d-flex justify-content-center">                        
                        <NavLink className="btn btn-outline-dark btn-sm" to={`/financials/${this.state.cikNumber}/cash-flow-statement`}>
                            Cash Flow Statement
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}
