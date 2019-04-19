import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {store} from '../../store/store'
class SearchPage extends Component{
    state={
        search_info:''
    }

    render(){
        const {search_info}=this.props;
        if(search_info.results===undefined){
          return <div></div>
        }
        console.log(search_info);
        
       return(<div>{search_info.results.map(item=>(<div>{item.original_title}</div>))}</div>)
    }
}

const mapStateToProps = store => ({
  search_info: store.search_info,
  });
  
  
const ConnectSearchPage = connect(mapStateToProps,null)(SearchPage);

class  WrapperSearchPage extends Component {
  render() {
    console.log(store.getState());
    return (
      <Provider store = {store}>
        <ConnectSearchPage />
      </Provider>
    )
  }
  
}

export default WrapperSearchPage;