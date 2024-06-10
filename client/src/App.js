import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import MyPosts from "./components/Posts/MyPosts";
import CoffeeDonation from "./components/CoffeeDonation/CoffeeDonation";
import AdminCoffeePurchases from "./components/AdminCoffeePurchases/AdminCoffeePurchases";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/myposts" exact component={MyPosts} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/admin/coffee-purchases" exact component={AdminCoffeePurchases} />
          <Route path="/posts/myposts" exact component={MyPosts} />
          <Route path="/donate_coffee" exact component={CoffeeDonation} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
