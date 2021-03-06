import React, { Component } from 'react';
import { fetchShows} from '../../../../store/action';
import { Provider, connect } from 'react-redux';
import {store} from '../../../../store/store';
import Page from './components/page'
import './style.scss';

const mapStateToProps = store => ({
  shows: store.shows,
});

const mapDispatchToProps = {
  fetchShows,
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