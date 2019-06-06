import React, {Component} from 'react';
import styles from './MainContainer.module.css';
import SearchContainer from '../SearchContainer/SearchContainer';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';

class MainContainer extends Component {
    state = {
        songs: [],
        
    };

    

    render() {

        return(
            <div className={styles.mainContainer}>
                    
                    <SearchContainer navHome={this.props.navHome} visible={this.props.visible === 'search'}/>


                    <PlaylistContainer visible={this.props.visible === 'playlist'}/>
                
            </div>
        )
    }
}

export default MainContainer;