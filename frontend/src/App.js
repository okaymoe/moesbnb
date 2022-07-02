import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getSpots } from './store/spots'
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SpotForm from "./components/SpotForm";
import UserSpots from "./components/UserSpots";
import SpotsDetails from "./components/SpotsDetails"
import SpotsReviews from "./components/SpotsReviews/SpotsReviews";
import ReviewForm from "./components/ReviewForm";
import * as sessionActions from "./store/session";
import PageNotFound from "./components/PageNotFound";

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
              <Home/>
            </Route>
            <Route exact path={'/spots/:id'}>
              <SpotsDetails user={sessionUser} spots={spots} />
              
            </Route>
            <Route exact path={'/spots'}>
              <SpotForm />
              
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path={'/users/:id/spots'}>
              <UserSpots spots={spots.spots} user={sessionUser} />
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