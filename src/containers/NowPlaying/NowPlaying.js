import React, {Component} from 'react';
import styles from './NowPlaying.module.css';

class NowPlaying extends Component {


    render() {
        return(
            <>
                <div className={styles.nowplayingOuter}>
                    <h1 className={styles.header}>Now Playing</h1>
                    <div className={styles.nowplaying}>
                            {this.props.current ? (
                                <img src={this.props.current.image} className={styles.image}/>
                            ) : null}
                            {this.props.current ? (
                                <h3 className={styles.title}>{this.props.current.title}</h3>
                            ): null}
                    </div>
                </div>
            </>
        )
    }
}



export default NowPlaying;