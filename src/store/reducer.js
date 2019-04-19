import {ACTION_TYPES} from './constants';

const initialState = {
    nowPlayingMovies:[],
    nowPlayingShows:[],
    toAir:[],
    content:[],
    search_info:[],
};
function reducer(state = initialState, action) {
    console.log();
    
    switch (action.type) {

        case ACTION_TYPES.SET_PLAYING_FILMS:
            return {
                ...state,
                nowPlayingMovies: action.payload.nowPlayingMovies.results.slice(0,3),
            };

        case ACTION_TYPES.SET_PLAYING_SHOWS:
            return {
                ...state,
                nowPlayingShows: action.payload.nowPlayingShows.results.slice(0,3),
            };

        case ACTION_TYPES.SET_NEXT_EPISODE_TO_AIR:
            return {
                ...state,
                toAir: action.payload.nextEpisodeToAir.slice(0,3),
        };

        case  ACTION_TYPES.GET_CONTENT:
            return{
            ...state,
            content: action.payload.content
        }

        case  ACTION_TYPES.SEARCH_INFO:
            return{
            ...state,
            search_info: action.payload.search_info
        }

        default:
            return state;
    }
}

export default reducer;
