import React, {Component} from 'react';
import styles from './NowPlaying.module.css';

class NowPlaying extends Component {


    render() {
        
        let current = this.props.current ? this.props.current : null;
        return(
            <>
                <div className={styles.nowplaying}>
                <h1 className={styles.header}>Now Playing</h1>
                    <div className={styles.imageContainer}>
                        {this.props.current ? (
                            <img src={this.props.current.image} className={styles.image}/>
                        ) : null}
                    </div>
                </div>
            </>
        )
    }
}



export default NowPlaying;