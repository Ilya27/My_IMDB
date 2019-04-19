import React, { Component } from 'react';
import './style.scss'
import {InfoAboutMovie,InfoAboutShow,InfoAboutPerson} from './components/index'

class InfoAbout extends Component {
    getInfo(){
        var arr=this.props.match.url.split("/");
        console.log(arr);
        if(arr[1]==='movie'){
            return <InfoAboutMovie   url={arr[2]}/>}
        if(arr[1]==='show'){
            return <InfoAboutShow url={arr[2]}/>}
        if(arr[1]==='person'){
          return <InfoAboutPerson url={arr[2]}/>}
    }
  render() {
    return (
      <div className='info'>
        {this.getInfo()}
      </div>
    );
  }
}

export default InfoAbout;