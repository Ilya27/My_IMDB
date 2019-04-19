import React, { Component } from 'react';
import './App.css';
import {Header,Footer} from './Layout/index.js'
import {Router, Route,Switch} from 'react-router-dom';
import history from './components/history';
import { WrapperSearchForm } from './components';
import { MoviesPage,TvShowsPage,MainWrapper,PeoplePage,WrapperSearchPage} from './screens';

export  class App extends Component {
  render() {
    return (
    <Router history = {history}>
      <div className="App">
        <Header/>
        <WrapperSearchForm/>
          <Switch>
            <Route path="/" exact component={MainWrapper} />
            <Route path="/movie/"  component={MoviesPage} />
            <Route path="/show/"  component={TvShowsPage} />
            <Route path="/person/"  component={PeoplePage} />
            <Route path="/search/"  component={WrapperSearchPage} />
          </Switch>
        <Footer/>
      </div>
    </Router>
    );
  }
}

export default App;
