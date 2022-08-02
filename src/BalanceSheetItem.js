import {Component} from "react";

export class BalanceSheetItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            CurrentNode : props.finStatementTree.financialPositions[props.currentNodeId],
            IsDescriptionDisplayed : false,
            FinData : {},
            Facts: [],
            Children: props.finStatementTree.financialPositions[props.currentNodeId].children
        }
    }

    componentDidMount(){
        console.log(" ~~~~ props.currentNodeId: " + this.props.currentNodeId);
        this.fetchFinData(this.state.CurrentNode);
    }

    fetchFinData(currentNode){ 
        let targetUrl = "https://lyropdpvy6.execute-api.us-west-2.amazonaws.com/dev/financial-data/CIK0000050863/BalanceSheet/" + currentNode.name;
        fetch(targetUrl)
            .then(response => {
                return response.json();
            })            
            .then(myJson => {
                this.setState({FinData:myJson});
                this.setState({Facts:myJson.facts});
            });
    }

    renderTableHeader(){
        return this.state.Facts.map((fact) =>
                <th>{fact.frame}</th>
            );
    }

    renderTableRow(){
        return this.state.Facts.map((fact) =>
                <td>{fact.value}</td>
            );
    }
    
    switchDescriptionState(){
        this.setState({IsDescriptionDisplayed: !this.state.IsDescriptionDisplayed});
    }

    renderDescriptionRow(){
        if (this.state.IsDescriptionDisplayed === false){
            return (                
                <div class = "row"> </div>
            )
        }
        return (                
            <div class = "row">
                <h6><em>{this.state.FinData.description}</em></h6>
            </div>
        )
    }

    render(){
        return (
            <div class = "container">
                <div class = "row">
                    <h5>
                    <button type="button" class="btn" onClick={() => this.switchDescriptionState()}><i class="bi bi-info-circle" data-toggle="tooltip" data-placement="top" title="Click to view description" ></i></button> {this.state.FinData.displayName}
                    </h5>
                </div>
                {this.renderDescriptionRow()}
                <div class = "row">
                    <table class="table table-bordered table-striped" fixed-header>
                        <thead>
                            <tr>
                                {this.renderTableHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.renderTableRow()}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class = "row">
                    {this.state.Children}
                </div>
            </div>
        )
    }
}