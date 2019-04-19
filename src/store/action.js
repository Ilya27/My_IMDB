import {ACTION_TYPES} from './constants';

export const NowPlayingMovies = nowPlayingMovies => ({
    type: ACTION_TYPES.SET_PLAYING_FILMS,
    payload: {nowPlayingMovies},
});

export const NowPlayingShows = nowPlayingShows => ({
    type: ACTION_TYPES.SET_PLAYING_SHOWS,
    payload: {nowPlayingShows},
});

export const NextEpisodeToAir = nextEpisodeToAir => ({
    type: ACTION_TYPES.SET_NEXT_EPISODE_TO_AIR,
    payload: {nextEpisodeToAir},
});

export const getContent = content => ({
    type: ACTION_TYPES.GET_CONTENT,
    payload: {content},
});

export const getSearchInfo = search_info => ({
    type: ACTION_TYPES.SEARCH_INFO,
    payload: {search_info},
})


export const fetchNowPlayingMovies = () => dispatch => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => {
            dispatch(NowPlayingMovies(data))
    });
};


export const fetchNowPlayingTVShows =  () => dispatch => {
    let arr=[];
    let count=0;
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        dispatch(NowPlayingShows(data))
        
        data.results.map(item => (fetch(`https://api.themoviedb.org/3/tv/${item.id}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
        .then(data=>data.json())
        .then(data=>{
            arr.push(data.next_episode_to_air.air_date);
            ++count;
            if(count===3){
                dispatch(NextEpisodeToAir(arr))}
            }
            )
        )
    );
})
};

export const fetchContent =  (type,state,activePage) => dispatch => {
    fetch(`https://api.themoviedb.org/3/${type}/${state}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=${activePage}`)
    .then(data=>data.json())
    .then(data=>dispatch(getContent(data.results)))
}

export const searchInfo = (value) => dispatch => {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&query=${value}&page=1&include_adult=false`)
    .then(data=>data.json())
    .then(data=>{console.log(data);dispatch(getSearchInfo(data))}) // into thunk 
}