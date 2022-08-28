import {Component} from "react";
import './TableStyle.css';

export class IncomeStatementItem extends Component{
    constructor(props){
        super(props);

        let locationPathname = window.location.pathname;
        let pathArr = locationPathname.split("/");
        const cikNumber = pathArr[2];

        let currentNode = props.finStatementTree.financialPositions[props.currentNodeId];

        this.state = {
            cikNumber: cikNumber,
            CurrentNode : currentNode,
            IsDescriptionDisplayed : false,
            FinData : {},
            Facts: [],
            Children: currentNode?.children,
            IsDropdownButtonVisible: (currentNode?.children != null),
            AreChildrenVisible: false
        }
    }

    componentDidMount(){
        this.fetchFinData(this.state.CurrentNode);
    }

    fetchFinData(currentNode){
        let targetUrl = "https://lyropdpvy6.execute-api.us-west-2.amazonaws.com/dev/financial-data/" + this.state.cikNumber + "/IncomeStatement/" + currentNode.name;
        fetch(targetUrl)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({FinData:myJson});
                // this.setState({Facts:myJson.facts});
                return myJson.facts;
            })
            .then(jsonFacts => {
                let facts = jsonFacts;
                while (facts.length < 12){
                    facts.unshift({
                        displayTimeFrame : "N/A",
                        displayValue : "N/A",
                    });
                }
                this.setState({Facts:facts});
            });
    }

    renderFinancialFact(){
        return this.state.Facts.map((fact) =>
            <div class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3">
                <div class="row text-secondary">
                    <small>{fact.displayTimeFrame}</small>
                </div>
                <div class="h6 row text-dark">
                    <strong class="text-left">
                        {fact.displayValue}
                    </strong>
                </div>
            </div>
        );
    }

    switchDescriptionState(){
        this.setState({IsDescriptionDisplayed: !this.state.IsDescriptionDisplayed});
    }

    renderDescriptionRow(){
        if (this.state.IsDescriptionDisplayed === false){
            return (
                ""
            )
        }
        return (
            <div class="text-center text-secondary"><em><small>{this.state.FinData.description}</small></em></div>
        )
    }

    renderDropdownButton(){
        if (this.state.IsDropdownButtonVisible === false){
            return (
                ""
            )
        }
        if (this.state.AreChildrenVisible === true){
            return (
                <button type="button" class="btn" onClick={() => this.switchChildrenState()}>
                    <i class="bi bi-caret-down"></i>
                </button>
            )
        }
        else {
            return (
                <button type="button" class="btn" onClick={() => this.switchChildrenState()}>
                    <i class="bi bi-caret-right"></i>
                </button>
            )
        }
    }

    switchChildrenState(){
        this.setState({AreChildrenVisible: !this.state.AreChildrenVisible});
    }

    renderChildren(){
        if (this.state.AreChildrenVisible === false){
            return ("")
        }
        if (!this.state.Children){
            return ("")
        }

        return (
            this.state.Children.map((child) =>
                <IncomeStatementItem currentNodeId={child} finStatementTree={this.props.finStatementTree} />)
        )
    }

    render(){
        return (
            <div class = "container border-bottom">
                    <div class = "row">
                        <div class="col d-flex justify-content-center">
                            {this.renderDropdownButton()}
                            <div class="d-flex align-self-center"><h6 class="m-0 p-0 align-self-center">{this.state.FinData.displayName}</h6></div>
                            <button type="button" class="btn" onClick={() => this.switchDescriptionState()}>
                                <i class="bi bi-info-circle" data-toggle="tooltip" data-placement="top" title="Click to view description" ></i>
                            </button>
                            <button type="button" class="btn">
                                <i class="bi bi-plus-slash-minus" data-toggle="tooltip" data-placement="top" title="Click to view description" disabled></i>
                            </button>
                            <button type="button" class="btn">
                                <i class="bi bi-bar-chart-line" data-toggle="tooltip" data-placement="top" title="Click to view description" disabled></i>
                            </button>
                        </div>
                    </div>
                    <div class = "row">
                        {this.renderDescriptionRow()}
                    </div>
                    <div class = "row">
                        {this.renderFinancialFact()}
                    </div>
                    <div class = "row d-flex justify-content-center">
                        {this.renderChildren()}
                    </div>

                </div>
        )
    }
}