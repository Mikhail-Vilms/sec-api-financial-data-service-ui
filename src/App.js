import logo from './logo.svg';
import './App.css';
import {HeadBar} from './HeadBar';
import {HomePage} from './HomePage';
import {CompanyPage} from './CompanyPage';
import {BalanceSheet} from './BalanceSheet';
import {IncomeStatement} from './IncomeStatement';
import {CashFlowStatement} from './CashFlowStatement';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <HeadBar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/financials/:cikNumber" element={<CompanyPage/>} />
            <Route path="/financials/:cikNumber/balance-sheet" element={<BalanceSheet/>}/>
            <Route path="/financials/:cikNumber/income-statement" element={<IncomeStatement/>}/>
            <Route path="/financials/:cikNumber/cash-flow-statement" element={<CashFlowStatement/>}/>
          </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
