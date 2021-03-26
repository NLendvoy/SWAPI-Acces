import './App.css';
import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import People from './components/people';
import MovieDetails from './components/movieDetails';
import NotFound from './components/common/notFound';

/*
  Root of app. Routing with all components.
  Include redirect from "/" to "/people" and a "/notFound" component.
*/
class App extends Component {
  state = {  }
  render() { 
    return ( 
    <div>
      <Switch>
        <Route path="/movieDetails/:id" component={MovieDetails}/>
        <Route path="/people" component={People}/>
        <Route path="/not-found" component={NotFound}/>
        <Redirect from="/" exact to="/people"/>
        <Redirect to="/not-found"/>
      </Switch>
      
    </div> 
    );
  }
}
 
export default App;