import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import history  from '../../../../../components/history';
import{OurProgressRing,OurPagination} from '../../../../../components/index';

class Page extends Component{
    state={
        activePage: '',
    }

    componentDidMount(){
      let {fetchShows,type,state}=this.props;
      if(type==="show"){
        type="tv";
      }
      if(state==='on tv'){
        state='on_the_air'
      }
      fetchShows(type,state,1);
      history.push(`/show/on tv#page-1`);
    }

    handlePageChange= pageNumber=>{
      let {fetchShows,type,state}=this.props;
      if(type==="show"){
        type="tv";
      }
      if(state==='on tv'){
        state='on_the_air'
      }
      this.setState({activePage: pageNumber});
      fetchShows(type,state,pageNumber);
      history.push(`/show/on tv?page-${pageNumber}`);
    }

    cut(value){
      var size = 215;
      console.log( value.length );
      if(value.length ===0){
        return 'This show has no overview'
      }else if(value.length > size){
        return value.slice(0, size) + ' ...';
      }else{
        return value
      }
    }

    render() {
        let index=0;
        const {shows}=this.props;
        return(<div className='shows_upcoming'>
        {
          shows.map(item => (
            <div className={`show_upcoming show_${index++}`} key={item.id}>
              <Link to={`/show/${item.id}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt='show_picture'/></Link>
              <div className='info_upcoming'>
                <h2>{item.name}</h2>
                <p>{item.first_air_date}</p>
                <p>{this.cut(item.overview)}</p>
                <div className='container_circle'>
                  <OurProgressRing progress={item.vote_average}/>
                </div>
             </div>
            </div>))
          }
        <OurPagination handlePageChange = {this.handlePageChange} activePage={this.state.activePage}/>
      </div>);
    }
}

export default Page;