import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import AddBooking from './components/bookingComponents/AddBooking';
import AddPayment from './components/paymentComponents/AddPayment';
import Dashboard from './components/Dashboard'
import DetailViewBooking from './components/bookingComponents/DetailViewBooking';
import DetailViewPayment from './components/paymentComponents/DetailViewPayment';
import Login from './components/Login'
import { NavBar } from "./components/AppBar"
import React from 'react';
import UpdateBooking from './components/bookingComponents/UpdateBooking';
import ViewBookings from './components/bookingComponents/ViewBookings';
import ViewPayments from './components/paymentComponents/ViewPayments';
import TotalRevenue from './components/paymentComponents/TotalRevenue';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/viewBooking">
            <ViewBookings />
          </Route>
          <Route path="/addBooking">
            <AddBooking />
          </Route>
          <Route path="/viewPayment">
            <ViewPayments />
          </Route>
          <Route path="/addPayment">
            <AddPayment />
          </Route>
          <Route path="/viewTotalRevenue">
            <TotalRevenue />
          </Route>
          <Route path="/updateBooking/:id" component={UpdateBooking} />
          <Route path="/detailViewBooking/:id" component={DetailViewBooking} />
          <Route path="/detailViewPayment/:id" component={DetailViewPayment} />
          
          
        </Switch>
      </div >
    </Router >
  );
}

export default App;
