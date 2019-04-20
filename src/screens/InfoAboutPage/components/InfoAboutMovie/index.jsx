import React, { Component } from 'react';
import{OurProgressRing} from '../../../../components/index'
import './style.scss'
class InfoAboutMovie extends Component {
    state={
        value:[],
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>this.setState({ value: data }))}

    fullDateToYear(fullYear){
        if(fullYear){
            let year = fullYear.split('-');
            console.log(year);
            return year[0];
        } 
    }

    checkValue(value){
        if(value){
            return <OurProgressRing progress={value}/>
        }
    }

    render() {
        const {value}=this.state;
        console.log(value);
        
        return (
            <div className='info_about_movie' >
                <div className='main_info'>
                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${value.poster_path}`} alt ='Poster'></img>
                        <div className='main_info__text'>
                            <h1>{value.title}<p className='date'>({this.fullDateToYear(value.release_date)})</p></h1>
                            <div className='container_circle'>
                                {this.checkValue(value.vote_average)}
                                <b>User Score</b>
                            </div>
                            <p>{value.overview}</p>
                            <i>{value.status}</i>
                        </div>
                </div>
            </div>
        );
    }
}

export  default  InfoAboutMovie