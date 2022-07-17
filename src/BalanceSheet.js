import React, {Component} from "react";
import {variables} from './Variables.js';

export class BalanceSheet extends Component{
    constructor(props){
        super(props);
        this.state = {
            consumedJson: null
        }
    }

    // https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
    fetchBalanceSheetData(){
        fetch(variables.API_URL)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                console.log("*** myJson *** : " + myJson);
                this.setState({consumedJson:myJson});
            });
    }

    componentDidMount(){
        this.fetchBalanceSheetData();
    }

    render(){
        console.log("render ===  ==== " + JSON.stringify(this.state.consumedJson));
        
        return (
            <div>
                qwdqwd
                {JSON.stringify(this.state.consumedJson)}
                {/* {this.state.departments} */}
            </div>
        )
    }
}