import React, { Component } from 'react';
import { Route,Switch } from "react-router-dom";
import InfoAbout from '../InfoAboutPage/index'
import {WrraperPagePopular,WrraperPageUpcoming }from './components/index';

class TvShowsPage extends Component{
    render(){
        let root = this.props.match.url
        console.log(root);
        return(
            <div>
                <Switch>
                    <Route path={`${root}/popular`}  exact component={WrraperPagePopular}/>
                    <Route path={`${root}/on TV`} exact component={WrraperPageUpcoming}/>
                    <Route path={`${root}/:id`} exact component={ InfoAbout }/>
                </Switch>
            </div>
        )
    }
}

export default TvShowsPage;