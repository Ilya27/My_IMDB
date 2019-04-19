import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { fetchContent} from '../../../../store/action';
import { Provider, connect } from 'react-redux';
import history  from '../../../../components/history';
import {store} from '../../../../store/store'
import './style.scss'
class ProgressRing extends React.Component {
  constructor(props) {
    super(props);
    
    const { radius, stroke } = this.props;
    
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }
  check(value){
      if(value<=40){
        return "red"
      }else if (value<=70){
        return "khaki"
      }else{
        return "green"
      }
  }
  
  render() {
    const { radius, stroke, progress } = this.props;

    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
  
    return (
      <svg
        height={radius * 2}
        width={radius * 2}
       >
        <circle
          stroke={this.check(progress)}
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ this.circumference + ' ' + this.circumference }
          style={ { strokeDashoffset } }
          stroke-width={ stroke }
          r={ this.normalizedRadius }
          cx={ radius }
          cy={ radius }
          className='circle'
         />
      </svg>
    );
  }
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progress: 0
    };
  }
  
  componentDidMount() {
  const {progress}=this.props;
  let  percent = progress*10;  
  this.setState({progress:percent})
  }
  
  render() {
    return (
      <ProgressRing
        radius={ 35 }
        stroke={ 5 }
        progress={ this.state.progress }
      />
    );
  }
}



class Page extends Component{
    state={
        activePage: '',
    }

    componentDidMount(){
      const {fetchContent,type,state}=this.props;
      fetchContent(type,state,1);
      history.push(`/${type}/${state}?page-1`);
    }

    handlePageChange= pageNumber=>{
      const {fetchContent,type,state}=this.props;
      this.setState({activePage: pageNumber});
      fetchContent(type,state,pageNumber);
      history.push(`/${type}/${state}?page-${pageNumber}`);
    }

    cut(value){
      var size = 215;
      console.log( value.length );
      
      if(value.length > size){
      return value.slice(0, size) + ' ...';}else{
        return value
      }
    }
    render() {
        let index=0;
        const {movies}=this.props;
        console.log(movies);
        
        return(
        <div>
          <div className='movies_popular'>
          {
            movies.map(item => (
            <div className={`movie_popular movie_${index++}`} key={item.id}>
              <Link to={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='movie_picture'/></Link>
              <div className='info_popular'>
                <h2>{item.title}</h2>
                <p>{item.release_date}</p> 
                <p>{this.cut(item.overview)}</p>
                <div className='container_circle'>
                  <Example progress={item.vote_average}/>
                  <p className='vote_average'>{item.vote_average}</p>
                </div>
              </div>
            </div>))
          }
          </div>
          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={1}
          totalItemsCount={5}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}/>
        </div>);
    }
}


const mapStateToProps = store => ({
  movies: store.content,
});

const mapDispatchToProps = {
  fetchContent,
};

const PagePopular = connect(mapStateToProps, mapDispatchToProps)(Page);


class WrraperPagePopular extends Component{
  render(){
    let type=this.props.match.url.toLowerCase().split('/')[1]
    let state=this.props.match.url.toLowerCase().split('/')[2];
    return(
      <Provider store = {store} >
        <PagePopular type={type} state={state}/>
      </Provider>
      )
    }
}

export default WrraperPagePopular;