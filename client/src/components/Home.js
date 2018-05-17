import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';
import ArtistMain from './artists/ArtistMain';
import ArtistCreate from './artists/ArtistCreate';
import ArtistDetail from './artists/ArtistDetail';
import ArtistEdit from './artists/ArtistEdit';


const Home = ({ children }) => {
  return (
    <div className="container">
      <Header />
    
      <Switch>
        <Route path="/" exact component={ArtistMain} />
        <Route path="/artists/new" component={ArtistCreate} />
        <Route path="/artists/:id" exact component={ArtistDetail} />
        <Route path="/artists/:id/edit" component={ArtistEdit} />
      </Switch>
    </div>
  );
};

export default Home;
