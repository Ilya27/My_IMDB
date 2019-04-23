import React, { Component } from 'react';
import { Route,Switch } from "react-router-dom";
import {WrraperPagePopular} from './components/index';
import InfoAbout from '../InfoAboutPage/index';

class PeoplePage extends Component{
    render(){
        let root = this.props.match.url
        return(
            <div>
                <Switch>
                    <Route path={`${root}/popular/&page=:number`} exact component={WrraperPagePopular}/>
                    <Route path={`${root}/:id`} exact component={ InfoAbout }/>
                </Switch>
            </div>
        )
    }
}

export default PeoplePage