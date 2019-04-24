import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from'moment' ;
import person_placeholder from '../../../../assets/img/person_placeholder.png';
import placeholder from '../../../../assets/img/placeholder.jpg';
import './style.scss';
class InfoAboutShow extends Component {
    state={
        info:[],
        cast:[],
        crew:false,
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/tv/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
    .then(data=>data.json())
    .then(data=>{
        let info=data;
        fetch(`https://api.themoviedb.org/3/tv/${data.id}/credits?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>{
            this.setState({info:info, 
            crew:data.crew.splice(0,4),
            cast:data.cast.splice(0,5)})
        })
    })}

    checkPic(link){
        let style={
            width:"300px",
            height:"450px"
        }
        if(link){
            return <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${link}`} alt ='Poster'></img>
        }else{
            return <img src={placeholder} alt = 'Poster' style={style}></img>
        }
    }

    checkCastPic(link){
        let style={
            width:"138px",
            height:"175px"
        }
        if(link){
            return <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${link}`} alt='cast-pic'></img>
        }else{
            return <img src={person_placeholder} alt = 'cast-pic' style={style}></img>
        }
    }

    fullDateToYear(fullYear){
        if(fullYear){
            let year = fullYear.split('-');
            return year[0];
        } 
    }


    printCrew(crew){
        let print=[];
        if(crew){
                crew.map(item=>
                    (print.push(<div className='crew__info'>
                    <Link to={`/person/${item.id}`}>
                        <p>{item.name}</p>
                    </Link>
                    <p>{item.job}</p>
                </div>)) 
                )
                return print;
            }
    }

    printCast(cast){
        let print=[];
        console.log(cast);
        cast.map(item=>
            (print.push(
            <div className='cast__info'>
                <Link to={`/person/${item.id}`}> 
                    {this.checkCastPic(item.profile_path)}
                    <p>{item.name}</p> 
                </Link>
                <p>{item.character}</p>
            </div>)) 
        )
        return print;
    }

    normalDate(date){
        if(date){
            var format='LL';
            var result= moment(date.air_date).format(format) 
            return <p>Next episode :<br></br>{' '+result}</p>
        }
    }
    normalTime(time){
        var hour = time / 60 ^ 0;
        if (hour>=1) {
            var minute = time % 60;
            if (minute < 10) minute = minute;
            return <p>{hour}h</p>
        }else{
            var minute = time % 60;
            if (minute < 10) minute = minute;
            return <p>{minute}m</p>
        }
        
    }

    logo(value){
        let print=[]
        if(value){
            value.map
            (item=>
                (print.push
                    (<div className='network_logo'>
                    <img src={`https://image.tmdb.org/t/p/h30${item.logo_path}`}alt='logo-networks'></img>
                    </div>)
                )
            )
        }
        return print ;
    }
    render() {
    const {info,cast,crew}=this.state;
    console.log(info);
    
    return (
        <div className='info_about_show' >
            <div className='main_info'>
                {this.checkPic(info.poster_path)}
                <div className='main_info__text'>
                    <h1>{info.name}<p className='date'>({this.fullDateToYear(info.first_air_date)})</p></h1>
                    <h2>Overview</h2>
                    <p>{info.overview}</p>
                    <h2>Featured Crew</h2>
                    <div className='crew'>
                        {this.printCrew(crew,info.created_by)}
                    </div>
                </div>
            </div>
            <div className='additional_info'>
                <div className='cast'>
                    <div className='Top Billed Cast'>
                        <h2>Series Cast</h2>
                    </div>
                    <div className='actor'>
                        {this.printCast(cast)}
                    </div>
                </div>
                <div className='facts'>
                    <h4>Status</h4>
                    <p>{info.status}</p>
                    <h4>Release Information</h4>
                    {this.normalDate(info.next_episode_to_air)}
                    <h4>Network</h4>
                    <p>{this.logo(info.networks)}</p>
                    <h4>Type</h4>
                    <p>{info.type}</p>
                    <h4>Runtime</h4>
                    {this.normalTime(info.episode_run_time)}
                </div>
            </div>
        </div>
        );
    }
}


export  default  InfoAboutShow