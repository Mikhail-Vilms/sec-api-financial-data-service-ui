import React, {Component} from "react";
import {variables} from './Variables.js';
import {CompanyPage} from './CompanyPage';
import {CashFlowStatementItem} from './CashFlowStatementItem';

export class CashFlowStatement extends Component{
    constructor(props){
        super(props);
        
        // retrieve cik number from current current route
        let locationPathname = window.location.pathname;
        let pathArr = locationPathname.split("/");
        const cikNumber = pathArr[2];

        this.state = {
             // company's cik number
            cikNumber: cikNumber, 

            // json contains structure for the financial statement
            finStatementTree: null,
            // "root nodes" of the page
            nodesToDisplay: ["CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect"],
        }
    }

    componentDidMount(){
        this.fetchStatementStructure();
    }


    fetchStatementStructure(){
        let targetUrl = variables.CASH_FLOW_STATEMENT_STRUCT_URL + this.state.cikNumber + "/" + "CashFlowStatement";
        fetch(targetUrl)
            .then(response => {
                return response.json();
            })
            .then(finStatementTree => {
                this.setState({finStatementTree:finStatementTree});
            });
    }

    render(){
        if(!this.state.finStatementTree){
            return (
                <div>
                    Loading...
                </div>
            )
        }        
        console.log("~~~~ RENDER: this.state.finStatementTree: " + JSON.stringify(this.state.finStatementTree));
        return (
            <div>
                <CompanyPage/>
                <div className="container">
                {this.state.finStatementTree ? 
                    this.state.nodesToDisplay.map((nodeKey) => 
                        <CashFlowStatementItem currentNodeId={nodeKey} finStatementTree={this.state.finStatementTree} />)
                    : "NOT LOADED YET"}
                </div>
            </div>
        )
    }
}