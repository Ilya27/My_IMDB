import React, { Component } from 'react';
class InfoAboutMovie extends Component {
    state={
        value:[],
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>this.setState({ value: data }))}

    render() {
        const {value}=this.state;
        console.log(value)
        if(value==undefined){
            return <div>loading</div>
        }
        return (
            <div>
                <h1>{value.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${value.poster_path}`} alt ='Poster'></img>
                <p>{value.overview}</p>
                <i>{value.status}</i>
            </div>
        );
    }
}

export  default  InfoAboutMovie