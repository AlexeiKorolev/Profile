import '../style/App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlusNav from './PlusNav';
import OthelloReport from './OthelloReport';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/othello-gpt" component={OthelloReport} />
          <Route path="/" component={PlusNav} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
