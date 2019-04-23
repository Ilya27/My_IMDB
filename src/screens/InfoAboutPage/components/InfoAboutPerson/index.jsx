import React, { Component } from 'react';
import person_placeholder from '../../../../assets/img/person_placeholder.png';
import placeholder from '../../../../assets/img/placeholder.jpg';
import {Link} from 'react-router-dom';
import './style.scss';
class InfoAboutPerson extends Component {
    state={
        info:[],
        movie_credits:[],
        show_credits:[],
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/person/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
    .then(data=>data.json())
    .then(data=>{ 
        let info=data;
        fetch(`https://api.themoviedb.org/3/person/${data.id}/movie_credits?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>{
            this.setState({info:info,movie_credits:data.cast})
        })
        fetch(`https://api.themoviedb.org/3/person/${data.id}/tv_credits?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>{   
            this.setState({info:info,show_credits:data.cast}) 
        })


    })
}

checkPic(link){
    let style={
        width:"300px",
        height:"450px"
    }
    if(link){
        return <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${link}`} alt ='Poster'></img>
    }else{
        return <img src={person_placeholder} alt = 'Poster' style={style}></img>
    }
}

checkPoster(link){
    let style={
      width:'150px',
      height:'225px',
    }
    if(link){
      return <img src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2${link}`} alt='Poster'></img>
    }else{
      return <img  style={style} src={placeholder} alt='poster'></img>
    }
  }

checkPage(link){
    if(link){
        return <a href={link} rel="noopener noreferrer" target="_blank">{link}</a>
    }else{
        return <p>&mdash;</p>
    }
}

checkDeathday(deathday){
    if(deathday){
        return <p>{deathday}</p>
    }else{
        return <p>&mdash;</p>
    }
}

checkGender(gender){
    if(gender===1){
        return <p>Female</p>
    }else{
        return <p>Male</p>
    }
}

printKnowAs(value){
    if(value){
        let newArra=[];
        value.map(item=>{newArra.push(<p>{item}</p>)})
        return newArra;
    }
}

printKnowForMovie(value){
    let newArray=[];
    value.slice(0,4).map(item=>{
        newArray.push(
        <div className={`known_for_block`}>
             <Link to={`/movie/${item.id}`}>
                <div class="container">
                    {this.checkPoster(item.poster_path)}
                    <div class="text"></div>
                </div>
                <p>{item.title||item.name}</p>
            </Link>
        </div>)})
    return newArray;
}

printKnowForShow(value){
    let newArray=[];
    value.slice(0,4).map(item=>{
        newArray.push(
        <div className={`known_for_block`}>
            <Link to={`/show/${item.id}`}>
                <div class="container">
                    {this.checkPoster(item.poster_path)}
                </div>
                <p>{item.title||item.name}</p>
            </Link>
        </div>)})
    return newArray;
}

    render() {
        const {info,movie_credits,show_credits}=this.state;
        console.log(movie_credits);
        
        return (
            <div className='info_about_person'>
                <div className='main_info'>
                    <div className=' container_main_info'>
                        {this.checkPic(info.profile_path)}
                        <div className='biography'>
                            <h1>{info.name}</h1>
                            <h3>Biography</h3>
                            <p>{info.biography}</p>
                        </div>
                    </div>
                </div>
                <div className='addition_info'>
                    <div className='personal_info'>
                        <div className='container_personal_info'>
                            <h3>Personal Info</h3>
                            <div className='known_for_department'>
                                <p><strong>Know For</strong></p>
                                <p>{info.known_for_department}</p>
                            </div>
                            <div className='gender'>
                                <p><strong>Gender</strong></p>
                                {this.checkGender(info.gender)}
                            </div>
                            <div className='credits'>
                                <p><strong>Known Credits</strong></p>
                                <p>{movie_credits.length+show_credits.length}</p>
                            </div>
                            <div className='birthday'>
                                <p><strong>Birthday</strong></p>
                                <p>{info.birthday}</p>
                            </div>
                            <div className='deathday'>
                                <p><strong>Deathday</strong></p>
                                {this.checkDeathday(info.deathday)}
                            </div>
                            <div className='place_of_birth'>
                                <p><strong>Place of Birth</strong></p>
                                <p>{info.place_of_birth}</p>
                            </div>
                            <div className='site'> 
                                <p><strong>Official site</strong></p>
                                {this.checkPage(info.homepage)}
                            </div>
                            <div className='also_know_as'>
                                <p><strong>Also Known As</strong></p>
                                {this.printKnowAs(info.also_known_as)}
                            </div>
                        </div>
                    </div>

                    <div className='known_for'>
                        <div className='known_for__title'>
                            <h3>Khown For</h3>
                        </div>
                        <div className='known_for__container_with'>
                            {this.printKnowForMovie(movie_credits)}
                            {this.printKnowForShow(show_credits)}
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}

export  default  InfoAboutPerson