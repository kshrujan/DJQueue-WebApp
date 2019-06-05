import React, {Component} from 'react';
import styles from './NowPlaying.module.css';
import NowPlayingSong from './NowPlayingSong'
class NowPlaying extends Component {


    render() {
        
        let {nowPlaying, lastPlayed, upNext} = {...this.props};
        // console.log(nowPlaying)

        // console.log("nowplaying", this.props)
        return(
           
                <div className={styles.nowplaying}>
                    <NowPlayingSong title={"Last"} current={lastPlayed} />
                    <NowPlayingSong title={"Active"} current={nowPlaying} />
                    <NowPlayingSong title={"Up Next"} current={upNext} />
                   
                            
                        
                </div>
            
            )

        // if(current === null){
        //     return(
           
        //         <div className={styles.nowplaying}>

        //         <h1 className={styles.header}>Now Playing1</h1>
        //             <div className={styles.imageContainer}>
                        
        //                     <div className={styles.image}></div>
                            
                        
        //             </div>
        //         </div>
            
        //     )
        // }
        // else{
        //     return(
           
        //         <div className={styles.nowplaying}>
        //         <h1 className={styles.header}>Now Playing</h1>
        //             <div className={styles.imageContainer}>
        //                 {this.props.current ? (
        //                     <img src={this.props.current.image} className={styles.image}/>
        //                 ) : null}
        //             </div>
        //         </div>
            
        //     )
        // }
        
    }
}



export default NowPlaying;