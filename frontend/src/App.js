import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';

import Navigation from './components/Navigation';
import PageNotFound from './components/PageNotFound';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotFormPage from './components/SpotFormPage';
import SpotsContainer from './components/SpotsContainer';
import SpotDetail from './components/SpotDetail';
import Footer from './components/Footer';
import Profile from './components/Profile';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded ? (
    <>
      <Navigation loaded={loaded} />
      <Switch>
        <Route exact path="/">
          <SpotsContainer />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/spots/new">
          <SpotFormPage />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetail />
        </Route>
        <Route exact path='/users/:userId'>
          <Profile />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </>
    ) : null
}

export default App;
