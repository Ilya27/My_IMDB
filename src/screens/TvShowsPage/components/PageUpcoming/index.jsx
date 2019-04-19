import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { fetchContent} from '../../../../store/action';
import { Provider, connect } from 'react-redux';
import {store} from '../../../../store/store'
import history  from '../../../../components/history';
class Page extends Component{
    state={
        activePage: '',
    }

    componentDidMount(){
      let {fetchContent,type,state}=this.props;
      if(type==="show"){
        type="tv";
      }
      if(state==='on tv'){
        state='on_the_air'
      }
      fetchContent(type,state,1);
      history.push(`/show/on tv#page-1`);
    }

    handlePageChange= pageNumber=>{
      let {fetchContent,type,state}=this.props;
      if(type==="show"){
        type="tv";
      }
      if(state==='on tv'){
        state='on_the_air'
      }
      this.setState({activePage: pageNumber});
      fetchContent(type,state,pageNumber);
      history.push(`/show/on tv?page-${pageNumber}`);
    }
    render() {
        let index=0;
        const {shows}=this.props;
        return(<div className='shows_upcoming'>
        {
          shows.map(item => (
            <div className={`show_${index++}`} key={item.id}>
              <h2>{item.name}</h2>
              <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w500_and_h282_face${item.backdrop_path}`} alt='show_picture'/></Link>
              <p>{item.vote_average}</p>
              <p>{item.first_air_date}</p>
              <p>{item.overview}</p>
            </div>))
          }
      <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={1}
          totalItemsCount={5}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>);
    }
}

const mapStateToProps = store => ({
  shows: store.content,
});

const mapDispatchToProps = {
  fetchContent,
};

const PagePopular = connect(mapStateToProps, mapDispatchToProps)(Page);


class WrraperPageUpcoming extends Component{
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

export default WrraperPageUpcoming;