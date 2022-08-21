import React, {Component} from "react";
import {variables} from './Variables.js';
import {BalanceSheetItem} from './BalanceSheetItem';
import {CompanyPage} from './CompanyPage';

export class BalanceSheet extends Component{
    constructor(props){
        super(props);

        this.state = {
            // json contains structure for the financial statement
            finStatementTree: {},
            nodesToDisplay: ["Assets", "LiabilitiesAndStockholdersEquity"], // "root nodes" of the page
            nodeKeys: [],
        }
    }

    fetchStatementStructure(){
        fetch(variables.BALANCE_SHEET_STRUCT_API_URL)
            .then(response => {
                return response.json();
            })
            .then(finStatementTree => {
                this.setState({finStatementTree:finStatementTree});
                return finStatementTree;
            }).then(finStatementTree => {
                this.setState(
                    {
                        nodeKeys : this.state.nodesToDisplay
                            .map((nodeName) => this.findNodeKey(nodeName, finStatementTree))
                    });
            })
    }
    
    componentDidMount(){
        this.fetchStatementStructure();
    }

    findNodeKey(nodeName, finStatementTree){
        for (let key in finStatementTree.financialPositions) {
            if (key === nodeName){
                return key;
            }
        }
    }

    render(){
        if(!this.state.finStatementTree){
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div>
                <CompanyPage/>
                <div className="container">
                {this.state.finStatementTree ? 
                    this.state.nodeKeys.map((nodeKey) => 
                        <BalanceSheetItem currentNodeId={nodeKey} finStatementTree={this.state.finStatementTree} />)
                    : "NOT LOADED YET"}
                </div>
            </div>
        )
    }
}