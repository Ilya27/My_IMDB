import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {store} from '../../store/store';
import { Route,Switch,Link} from "react-router-dom";
import SearchPage from './Page/index'
import './style.scss';

const mapStateToProps = store => ({
  search_info: store.search_info,
  });
  
  
const ConnectSearchPage = connect(mapStateToProps,null)(SearchPage);

class  WrapperSearchPage extends Component {
  render() {
    let root = this.props.match.url
    
    return (
      <Provider store = {store}>
      <div className='search_page'>
        <div className='search_page__select_block'>
          <div className='link'><Link to={`${root}/movie`}>Movies</Link></div>
          <div className='link'><Link to={`${root}/show`}>TV Shows</Link></div>
        </div>
        <Switch>
                <Route path={`${root}/movie`}  exact component={ConnectSearchPage}/>
                <Route path={`${root}/show`} exact component={ ConnectSearchPage }/>
        </Switch>
      </div>
      </Provider>
    )
  }
  
}

export default WrapperSearchPage;