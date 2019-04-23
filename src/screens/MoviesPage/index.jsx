import React, { Component } from 'react';
import { Route,Switch } from "react-router-dom";
import InfoAbout from '../InfoAboutPage/index';
import history  from '../../components/history';
import {WrraperPagePopular,WrraperPageUpcoming }from './components/index';

class MoviesPage extends Component{
    render(){
        let root = this.props.match.url
        console.log(history);
        console.log(history.location.pathname.split('/'))
        let page=history.location.pathname.split('/');
        return(
            <div>
                <Switch>
                    <Route path={`${root}/popular/&page=:id`} exact component={WrraperPagePopular}/>
                    <Route path={`${root}/upcoming/&page=:id`} exact component={WrraperPageUpcoming}/>
                    <Route path={`${root}/:id`} exact component={InfoAbout}/>
                </Switch>
            </div>
        )
    }
}

export default MoviesPage