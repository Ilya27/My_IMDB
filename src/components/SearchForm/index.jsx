import React, { Component } from 'react';
import { searchInfo } from '../../store/action';
import { Provider, connect } from 'react-redux';
import history  from '../history';
import {store} from '../../store/store'
import './style.scss'

class SearchForm extends Component {
  onChange = event => this.setState({ value: event.target.value })

  keyPress = event => {
    const { searchInfo } = this.props;
    if(event.keyCode === 13){
      const value = this.state.value;
      searchInfo(value);
      const { search_info } = this.props;
      console.log(search_info);
      history.push('/search/');
   }
  
  }

  render() {
    return (
        <div className='searchForm'>
            <input type="text" onKeyDown={this.keyPress} onChange={this.onChange} value={this.value} placeholder="Search movies or shows" />
        </div>
    );
  }
}


const mapStateToProps = store => ({
  search_info: store.search_info,
});

const mapDispatchToProps = {
  searchInfo,
};

const ConnectSearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

class  WrapperSearchForm extends Component {
  render() {
    return (
      <Provider store = {store}>
        <ConnectSearchForm/>
      </Provider>
    )
  }
  
}
export default WrapperSearchForm;
