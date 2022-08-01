import React, {Component} from "react";
import {variables} from './Variables.js';
import {BalanceSheetItem} from './BalanceSheetItem';

export class BalanceSheet extends Component{
    constructor(props){
        super(props);

        this.state = {
            // json contains structure for the financial statement
            finStatementTree: {},
            itemsToDisplay: ["Assets", "LiabilitiesAndStockholdersEquity"]
        }
    }

    fetchStatementStructure(){
        fetch(variables.BALANCE_SHEET_STRUCT_API_URL)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({finStatementTree:myJson});
            });
    }

    findRootNodeKey(finStatementTreeJson, nodeName){
        for (let key in finStatementTreeJson) {
            if (key.includes('_' + nodeName + '_')){
                return key;
            }
        }
    }

    componentDidMount(){
        this.fetchStatementStructure();
    }

    render(){
        return (
            this.state.itemsToDisplay.map((item) =>
                <BalanceSheetItem itemName={item} finStatementTree={this.state.finStatementTree} />
            )
        )
    }
}