import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/userprofile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App;
