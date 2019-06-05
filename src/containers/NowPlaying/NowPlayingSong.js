import React, {Component} from 'react';
import styles from './NowPlaying.module.css';

class NowPlayingSong extends Component {


    render() {
        let title = this.props.title;
        let current = this.props.current ? this.props.current : null;
        // console.log("now playing song:",current)
        let image = null;
        let subHeaderTitle = "";
        if(current !== null){
            image = <img className={styles.nowPlayingImage} src={current.image} alt={"album cover"}/>
            subHeaderTitle = current.title;
        }
       

        return(
           <div className={styles.nowPlayingSongContainer}>
            <h3 className={styles.nowPlayingHeader}>{title}</h3>
            
            <div className={styles.nowPlayingImageContainer}>
            <div className={styles.nowPlayingImageCropContainer}>
            {image}
            </div>
            </div>
            <h5 className={styles.nowPlayingSubHeader}>{subHeaderTitle}</h5>
           
           </div>
                

            
        )
        
        
        
    }
}



export default NowPlayingSong;