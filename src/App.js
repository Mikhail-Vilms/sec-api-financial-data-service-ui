import logo from './logo.svg';
import './App.css';
import {BalanceSheet} from './BalanceSheet';
import {IncomeStatement} from './IncomeStatement';
import {CashFlowStatement} from './CashFlowStatement';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

        <h3 className="d-flex justify-content-center m-3"> 
          Financials from SEC API
        </h3>

        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item-m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/balance-sheet">
                Balance Sheet
              </NavLink>
              <NavLink className="btn btn-light btn-outline-primary" to="/income-statement">
                Income Statement
              </NavLink>
              <NavLink className="btn btn-light btn-outline-primary" to="/cash-flow-statement">
                Cash Flow Statement
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/balance-sheet" element={<BalanceSheet/>}/>
          <Route path="/income-statement" element={<IncomeStatement/>}/>
          <Route path="/cash-flow-statement" element={<CashFlowStatement/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
