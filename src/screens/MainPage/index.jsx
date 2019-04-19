import React, { Component } from 'react';
import { fetchNowPlayingMovies,fetchNowPlayingTVShows } from '../../store/action';
import { Provider, connect } from 'react-redux';
import MainPage from './MainPage'
import {store} from '../../store/store'


const mapStateToProps = store => ({
  nowPlayingMovies: store.nowPlayingMovies,
  nowPlayingShows:store.nowPlayingShows,
  toAir:store.toAir,
});

const mapDispatchToProps = {
  fetchNowPlayingMovies,
  fetchNowPlayingTVShows,
};

const ConnectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);

class MainWrapper extends Component{
  render(){
    return(
    <Provider store = {store} >
      <ConnectedMainPage/>
    </Provider>
    )
  }
}

export default MainWrapper;



