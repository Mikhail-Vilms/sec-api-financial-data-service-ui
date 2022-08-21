import React, {Component} from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
export class HeadBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav class="navbar bg-white border-bottom px-3 py-1">
                <small>
                    <span class="navbar-text text-white">
                        <Link to={`/`}><i class="bi bi-house"></i></Link>
                        
                    </span>
                </small>
                <small>
                    <form class="form-inline">
                        <input class="form-control form-control-sm" type="search" placeholder="Symbol, eg. JNJ or KO"></input>
                    </form>
                </small>
                <small>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <small>
                            <i class="bi bi-list"></i>
                        </small>
                    </button>
                </small>
            </nav>
        )
    }
}