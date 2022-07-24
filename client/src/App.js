import './App.css';
import React from 'react';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import Create from './components/Create/Create';
// import Card from './components/Card/Card'
import { Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <h1>Henry Pokemon</h1>
    // </div>
    <React.Fragment>
      <Route path='/' component={Search}/>
      <Route exact path='/' component={Home}/>
      {/* <Route component={Card}/> */}
      <Route exact path='/pokemon/:id' component={PokemonDetail}/>
      <Route exact path='/crear' component={Create}/>
    </React.Fragment>
  );
}

export default App;
