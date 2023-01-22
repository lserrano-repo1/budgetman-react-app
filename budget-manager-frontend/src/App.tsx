import React from 'react';
import {ThemeProvider} from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import budgtManTheme from './theme/budgtManTheme';
import UserLoginForm from './features/Person/UserLoginForm';
import NewUserForm from './features/Person/NewUser';
import NotFound from './features/404/NotFound';
import './App.css';
import LandingPage from './features/Landing/Landing';

import Bank from './features/Bank/Bank';
import Dashboard from './features/Dashboard/Dashboard';
import TranHistory from './features/TranHistory/TranHistory';
import Transaction from './features/Transactions/Transaction';
import AccTransference from './features/Transfer/Transference';
import Account from './features/Account/Account';




function App() {


  return (
    <React.StrictMode>
    <ThemeProvider theme={budgtManTheme}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/login" element={<UserLoginForm/>} />
              <Route path="/newuser" element={<NewUserForm/>} />
              <Route path="/bank" element={<Bank/>} />
              <Route path="/transaction" element={<Transaction/>} />
              <Route path="/transference" element={<AccTransference/>} />
              <Route path="/tranhistory" element={<TranHistory/>} />
              <Route path="/account" element={<Account/>} />
             
                
              <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
</React.StrictMode>
  );
}

export default App;
