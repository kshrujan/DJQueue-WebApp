import React, {Component} from 'react';
import styles from './MainContainer.module.css';
import SearchContainer from '../SearchContainer/SearchContainer';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';
import {Route, Switch} from 'react-router-dom';

class MainContainer extends Component {
    state = {
        songs: [],
    };

    render() {

        return(
            <div className={styles.mainContainer}>
                <Switch>
                    <Route path="/select" component={SearchContainer}/>
                    <Route path="/" component={PlaylistContainer}/>
                </Switch>
            </div>
        )
    }
}

export default MainContainer;