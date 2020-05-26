import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Deck } from "./pages/Deck";
import { Flashcards } from "./pages/Flashcards";
import NewDeck from "./pages/Deck/newDeck";
import DeckResultTest from "./pages/DeckResultTest";
import Menu from "./pages/Menu";
import Header from "./pages/Header";
import NewCard from "./pages/NewCard";
import FlashcardsHeader from "./pages/Flashcards/FlashcardsHeader";

const contentStyle = {
  color: '#2d3142 !important',
  fontSize: '16px',
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <div>
      
    <div style={contentStyle}>
      <BrowserRouter>
        <Header>
          <Menu></Menu>
          <Switch>
            <PrivateRoute exact path="/deck" component={NewCard}/>
            <PrivateRoute exact path="/flashcards" component={FlashcardsHeader} />
          </Switch>
        </Header>

        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          
          <div style={{marginTop: '100px'}}>
            <PrivateRoute exact path="/deck/new" component={NewDeck} />
            <PrivateRoute exact path="/deck" component={Deck} />
            <PrivateRoute exact path="/flashcards" component={Flashcards} />
            <PrivateRoute exact path="/test-result/:id" component={DeckResultTest} />
          </div>

          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>

  </div>
);

export default Routes;