import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PokemonGrid from './components/PokemonGrid';
import NotFound from './pages/NotFound';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={props => <PokemonGrid {...props} />} />
          <Route path="/pokemon/:_name" component={PokemonDetails} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
