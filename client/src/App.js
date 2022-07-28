import "./App.css";
import React from "react";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import Create from "./components/Create/Create";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/" component={Search} />
      </Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/pokemon/:id" component={PokemonDetail} />
        <Route exact path="/crear" component={Create} />
    </React.Fragment>
  );
}

export default App;
