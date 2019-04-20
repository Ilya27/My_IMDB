import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../style.scss'

class NowPlayingMovies extends Component {
    render() {
      let index=0;
      const {nowPlayingMovies}=this.props;
      return(<div className='movies'>
      <h2>In Theaters</h2>
        {
        nowPlayingMovies.map(item => (
        <Link key={item.id} to={`/movie/${item.id}`}>
          <div className={`movie movie_${index++}`} key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500_and_h282_face${item.backdrop_path}`} alt='movie_picture'/>
            <div className='info'>
              <h3>{item.title}</h3>
              {/* <p>{item.release_date}</p> */}
            </div>
          </div>
        </Link>))
      }
      </div>);
    }
  };
  
  export default NowPlayingMovies;