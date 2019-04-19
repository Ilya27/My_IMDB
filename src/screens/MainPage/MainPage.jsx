import React, { Component } from 'react';
import{NowPlayingMovies,NowPlayingShows}  from './components/index'
import './style.scss';

class MainPage extends Component {
    componentDidMount() {
          this.props.fetchNowPlayingMovies();
          this.props.fetchNowPlayingTVShows();
        }
    render() {
      const {nowPlayingMovies,nowPlayingShows,toAir} = this.props;
      return (
        <div className='main_page'>
          <NowPlayingMovies nowPlayingMovies={nowPlayingMovies}/>
          <NowPlayingShows nowPlayingShows={nowPlayingShows} toAir={toAir}/>
        </div>
      );
    }
}

export default MainPage;