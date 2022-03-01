import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './App.css';

import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage'
import CreateActivity from './components/CreateActivity';
import Navbar from './components/Navbar';
import Details from './components/Details';
// import { getActivities, getAllCountries } from './redux/action';

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCountries());
  //   dispatch(getActivities())
  // }, [dispatch])
  
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
