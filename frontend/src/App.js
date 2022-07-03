import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getSpots } from './store/spots'
import SignupFormPage from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SpotForm from "./components/SpotForm";
import UserSpots from "./components/UserSpots";
import SpotsDetails from "./components/SpotsDetails"
import ReviewForm from "./components/ReviewForm";
import * as sessionActions from "./store/session";
import PageNotFound from "./components/PageNotFound";
import Banner from "./components/Banner";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Banner/>
              <Home/>
            </Route>
            <Route exact path={'/spots/:id'}>
              <SpotsDetails spots={spots} />
            </Route>
            <Route exact path={'/spots'}>
              <SpotForm />
            </Route>
            <Route exact path={'/users/:id/spots'}>
              <UserSpots spots={spots} user={sessionUser} />
            </Route>
            <Route>
              <PageNotFound/>
            </Route>
          </Switch>
      )}
    </>
  );
}

export default App;