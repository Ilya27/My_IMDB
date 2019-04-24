import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../style.scss'

class NowPlayingShows extends Component {
    render() {
      let index=0;
      const {nowPlayingShows}=this.props;
      return(<div className='shows'>
      <h2>On TV</h2>
        {
        nowPlayingShows.map(item => (
          <Link key={item.id} to={`/show/${item.id}`}>
          <div className={`show show_${index}`} key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500_and_h282_face${item.backdrop_path}`} alt='shows_picture'/>
            <div className='info'>
              <h3>{item.name}</h3>
            </div>
          </div> 
        </Link>))
      }
      </div>);
    }
  };
  
  export default NowPlayingShows;