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
                    
                    <SearchContainer visible={this.props.visible === 'search'}/>


                    <PlaylistContainer visible={this.props.visible === 'playlist'}/>
                
            </div>
        )
    }
}

export default MainContainer;