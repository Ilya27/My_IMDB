import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { fetchContent} from '../../../../store/action';
import { Provider, connect } from 'react-redux';
import history  from '../../../../components/history';
import {store} from '../../../../store/store'
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
    render() {
        let index=0;
        const {people}=this.props;
        console.log(people);
        return(<div className='person'>
        {
          people.map(item => (
            <div className={`person_${index++}`} key={item.id}>
              <h2>{item.name}</h2>
              <Link to={`/person/${item.id}`}><img src={`https://image.tmdb.org/t/p/w500_and_h282_face${item.profile_path}`} alt='person_picture'/></Link>
              <p>{item.vote_average}</p>
              <p>{item.release_date}</p>
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
  people: store.content,
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