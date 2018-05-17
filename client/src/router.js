import React from 'react';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history';
import Home from './components/Home';
// import ArtistMain from './components/artists/ArtistMain';
// import ArtistDetail from './components/artists/ArtistDetail';
// import ArtistCreate from './components/artists/ArtistCreate';
// import ArtistEdit from './components/artists/ArtistEdit';

const Routes = () => {
  return (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" component={Home} />

    </Switch>
  </Router>
  );
};

export default Routes;
