import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import history  from '../../../../../components/history';
import{OurPagination} from '../../../../../components/index';
import placeholder from '../../../../../assets/img/person_placeholder.png'
class Page extends Component{
    state={
        activePage: '',
    }

    componentDidMount(){
      const {fetchPersons,type,state}=this.props;
      fetchPersons(type,state,1);
    }

    handlePageChange= pageNumber=>{
      const {fetchPersons,type,state}=this.props;
      this.setState({activePage: pageNumber});
      fetchPersons(type,state,pageNumber);
      history.push(`/${type}/${state}/&page=${pageNumber}`);
    }
    
    cutForName(name){
      var size = 25;
      if(name.length > size){
        return name.slice(0, size) + '...';
      }else{
        return name
      }
    }
    
    cutForMovies(movie){
      let arrayName=[];
      var size = 30;
      movie.map(item=>{
        arrayName.push(item.name || item.title);
      })
      let stringName=arrayName.join(', ')
      if(stringName.length > size){
        return stringName.slice(0, size)+'...';
      }else{
        return stringName
      }
    }

    checkLink(link){
      var style = {
        width:"235px",
        height:"235px"
      };
      if(link){
        return <img src={`https://image.tmdb.org/t/p/w235_and_h235_face${link}`} alt='person_picture'/>
      }else{
        return <img src={placeholder} alt='person_picture' style ={style}></img>;
      }
    }
    

    render() {
        let index=0;
        const {persons}=this.props;
        console.log(this.props);
        return(<div className='persons_popular'>
          <h1>Popular People</h1>
          {
            persons.map(item => (
              <div className={`person_popular person_${index++}`} key={item.id}>
              <Link to={`/person/${item.id}`}>{this.checkLink(item.profile_path)}</Link>
                <div className='info_popular'>
                  <h2>{this.cutForName(item.name)}</h2>
                  <div className='known_for'>
                    {<p>{this.cutForMovies(item.known_for)}</p> }
                  </div>
                </div>
              </div>))
        }
      <OurPagination handlePageChange = {this.handlePageChange} activePage={this.state.activePage}/>
      </div>);
    }
}

export default Page;