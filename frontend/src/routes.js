import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Deck } from "./pages/Deck";
import { Flashcards } from "./pages/Flashcards";
import Header from "./pages/Header";
import NewCard from "./pages/NewCard";
import FlashcardsHeader from "./pages/Flashcards/FlashcardsHeader";
import TestComponent from './pages/TestComponent'
import DeckResultTest from './pages/DeckResultTest'

const contentStyle = {
  color: '#2d3142 !important',
  fontSize: '26px !important',
}

const marginTop = {
  marginTop: '130px'
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <div>
    <div style={contentStyle}>
      <BrowserRouter basename="flashcards">
        <Header>
          <Switch>
            <PrivateRoute exact path="/deck" component={NewCard}/>
            <PrivateRoute exact path="/" component={FlashcardsHeader} />
          </Switch>
        </Header>

        <div style={marginTop}>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            
              <PrivateRoute exact path="/" component={Flashcards} />
              <PrivateRoute exact path="/deck" component={Deck} />
              <PrivateRoute exact path="/test-result" component={DeckResultTest} />
              <PrivateRoute exact path="/test-component" component={TestComponent} />

            <Route path="*" component={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

  </div>
);

export default Routes;