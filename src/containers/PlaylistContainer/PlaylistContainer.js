import React, {Component} from 'react';
import styles from './PlaylistContainer.module.css';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import axios from 'axios';
import Loading from '../../components/UI/Loading/Loading';
import Layout from '../../hoc/Layout/Layout';
import NowPlaying from '../NowPlaying/NowPlaying';

function sortPlaylist(a, b) {
    var diffVotes = b.count - a.count;
    if (diffVotes !== 0) {
        return diffVotes;
    }

    return a.addedAt - b.addedAt;
}

class PlaylistContainer extends Component {

    state = {
        playlist: [],
        isLoading: false
    };


    componentDidMount = () => {
        let self = this;
        this.setState({
            ...this.state,
            isLoading: true
        }, ()=>{self.updateFromFirebase()})
        setInterval(()=>{this.updateFromFirebase()},2000)
    }

    updateFromFirebase = () => {
        //make a call to retrieve the current playlist
        axios.get('https://djqueue.firebaseio.com/.json')
        .then(response => {
            
            //loop through and place data in an array
            let data = [];
            // console.log(response.data)
            
            for(let key in response.data.playlist) {
                data.push({
                    ...response.data.playlist[key]
                })
            }
            data.sort(sortPlaylist);
            //now set the state for the data
            this.setState({
                ...this.state,
                playlist: data,
                nowPlaying: response.data.nowplaying,
                lastPlayed: response.data.lastPlayed,
                upNext: response.data.upNext,
                isLoading: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    onClickHandler = (index) => {
        //update the state and the json
        let clonedPlaylist = [...this.state.playlist];

        //update the count for song at index
        clonedPlaylist[index].count += 1;

        //order
        let updatedPlaylist = clonedPlaylist.sort(this.compare);

        //set state
        this.setState({
            ...this.state,
            playlist: updatedPlaylist
        })
    }

    compare = (a, b) => {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }

    render() {
        let playlist = this.state.isLoading ? <Loading /> : null;
        if(this.state.playlist.length > 0) {
            playlist = this.state.playlist.map((data, index) => {
               return <PlaylistCard title={data.title} key={index} clicked={() => this.onClickHandler(index)} count={data.count}/>
            })
        }
        // console.log(this.state.playlist);

        return(
            <Layout>
                <NowPlaying nowPlaying={this.state.nowPlaying} lastPlayed={this.state.lastPlayed} upNext={this.state.upNext}/>
                <div className={styles.playlistContainer}>
                    <h1 className={styles.header}>Current Playlist</h1>
                    {playlist}
                </div>
            </Layout>
        );
    }
}

export default PlaylistContainer;