import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import person_placeholder from '../../../../assets/img/person_placeholder.png';
import placeholder from '../../../../assets/img/placeholder.jpg';
import './style.scss';
import moment from'moment' ;
class InfoAboutMovie extends Component {
    state={
        info:[],
        crew:[],
        cast:[],
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>{
            console.log(data.id);
            let info=data;
            fetch(`https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=dcf025b227cc290e6845162a216870ff`)
            .then(data=>data.json())
            .then(data=>{
                this.setState({info:info,
                    crew:data.crew.splice(0,4),
                    cast:data.cast.splice(0,5)})
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
            console.log(year);
            return year[0];
        } 
    }


    printCrew(crew){
        let print=[];
        console.log(crew);
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
        var format='LL';
        var result= moment(date).format(format)
        console.log(result);
        
        return <p>{result}</p>
    }
    normalTime(time){
        var hour = time / 60 ^ 0;
        if (hour) {
            var minute = time % 60;
            if (minute < 10) minute = minute;
        } 
        return <p>{hour}h {minute}m</p>
    }

    normalCash(cash){
        var prise = String(cash).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,",);
        return <p>${prise}</p>
    }

    originalLanguage(languages){
        let ArrayLanguages=[]
        if(languages){
            languages.map(item=>(ArrayLanguages.push(<p>{item.name}</p>)));
        }
        return ArrayLanguages;
    }
    render() {
    const {info,crew,cast}=this.state;
    console.log(info);
    
    return (
        <div className='info_about_movie' >
            <div className='main_info'>
                {this.checkPic(info.poster_path)}
                    <div className='main_info__text'>
                        <h1>{info.title}<p className='date'>({this.fullDateToYear(info.release_date)})</p></h1>
                            {/* // <div className='container_circle'>
                            //     {this.checkValue(value.vote_average)}
                            //     <b>User Score</b>
                            // </div> */}
                        <h2>Overview</h2>
                        <p>{info.overview}</p>
                        <h2>Featured Crew</h2>
                        <div className='crew'>
                            {this.printCrew(crew)}
                        </div>
                    </div>
                </div>
                <div className='additional_info'>
                    <div className='cast'>
                        <div className='Top Billed Cast'>
                            <h2>Top Billed Cast</h2>
                        </div>
                        <div className='actor'>
                            {this.printCast(cast)}
                        </div>
                    </div>
                    <div className='facts'>
                        <h4>Status</h4>
                        <p>{info.status}</p>
                        <h4>Release Information</h4>
                        {this.normalDate(info.release_date)}
                        <h4>Original Language</h4>
                        {this.originalLanguage(info.spoken_languages)}
                        <h4>Runtime</h4>
                        {this.normalTime(info.runtime)}
                        <h4>Budget</h4>
                        {this.normalCash(info.budget)}
                        <h4>Revenue</h4>
                        {this.normalCash(info.revenue)}
                    </div>
                </div>
            </div>
        );
    }
}

export  default  InfoAboutMovie