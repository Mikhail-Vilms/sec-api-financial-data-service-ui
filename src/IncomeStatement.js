import React, {Component} from "react";
import {variables} from './Variables.js';
import {CompanyPage} from './CompanyPage';
import {BalanceSheetItem} from './BalanceSheetItem';
import {IncomeStatementItem} from './IncomeStatementItem';

export class IncomeStatement extends Component{
    constructor(props){
        super(props);

        let locationPathname = window.location.pathname;
        let pathArr = locationPathname.split("/");
        const cikNumber = pathArr[2];

        this.state = {
            cikNumber: cikNumber,
            // json contains structure for the financial statement
            finStatementTree: {},
            nodesToDisplay: ["NetIncomeLoss"], // "root nodes" of the page
            nodeKeys: [],
        }
    }

    componentDidMount() {
        this.fetchStatementStructure();
    }

    fetchStatementStructure(){
        let targetUrl = `https://lyropdpvy6.execute-api.us-west-2.amazonaws.com/dev/financial-statement-structure/${this.state.cikNumber}/IncomeStatement`;

        fetch(targetUrl)
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

    findNodeKey(nodeName, finStatementTree){
        //console.log("in ~~~~ findNodeKey finStatementTree: " + JSON.stringify(finStatementTree));
        // console.log("in ~~~~ findNodeKey");
        for (let key in finStatementTree.financialPositions) {
            if (key === nodeName){
                console.log("in ~~~~ key: " + JSON.stringify(key));
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
                        <IncomeStatementItem currentNodeId={nodeKey} finStatementTree={this.state.finStatementTree} />)
                    : "NOT LOADED YET"}
                </div>
            </div>
        )
    }
}