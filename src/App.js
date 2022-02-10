import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage'
import CreateActivity from './components/CreateActivity';
import Navbar from './components/Navbar';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Navbar} />
      <Route exact path='/home' component={HomePage} />
      <Route path='/home/country/:countryId' component={Details} />
      <Route exact path='/home/createActivity' component={CreateActivity} />
    </div>
  );
}

export default App;
