import React, {Component} from 'react';
import styles from './PlaylistContainer.module.css';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import axios from 'axios';
import Loading from '../../components/UI/Loading/Loading';
import Layout from '../../hoc/Layout/Layout';
import NowPlaying from '../NowPlaying/NowPlaying';
import * as firebase from 'firebase';

// function sortPlaylist(a, b) {
//     var diffVotes = b.count - a.count;
//     if (diffVotes !== 0) {
//         return diffVotes;
//     }

//     return a.addedAt - b.addedAt;
// }

class PlaylistContainer extends Component {

    constructor(props) {
        super(props);
        this.database = firebase.database().ref();
        this.state = {
            playlist: [],
            isLoading: false,
            nowPlaying:null,
            upNext: null,
            prevPlayed: null
        };
    }
    
    updatePlaylist = () => {
        axios.get('https://djqueue.firebaseio.com/.json')
            .then(response => {
                let data = [];
                //loop through and place data in an array
                for(let key in response.data.playlist) {
                    data.push({
                        key: key,
                        detail: response.data.playlist[key]
                    })
                }

                //sort playlist
                let sortedData = data.sort(this.compare);

                //now set the state for the data
                this.setState({
                    ...this.state,
                    playlist: sortedData,
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            //make a call to retrieve the current playlist
            this.updatePlaylist();
        })
    }

    componentWillMount = () => {
        let prevNowPlaying = this.state.nowPlaying;
        let prevUpNext = this.state.upNext;
        let prevPrevPlayed = this.state.prevPlayed;
        //setup listener
        this.database.child('nowplaying').on('value', (snapshot, index) => {
            if(snapshot.val() !== null) {
                prevNowPlaying = {
                    title: snapshot.val().title,
                    image: snapshot.val().image
                }
                
                //setState
                this.setState({
                    ...this.state,
                    nowPlaying: prevNowPlaying
                })
            }
        });

        this.database.child('upNext').on('value', (snapshot, index) => {
            
            if(snapshot.val() !== null) {
                prevUpNext = {
                    title: snapshot.val().title,
                    image: snapshot.val().image
                }
                
                //setState
                this.setState({
                    ...this.state,
                    upNext: prevUpNext
                })
            }
        });
        this.database.child('prevPlayed').on('value', (snapshot, index) => {
            if(snapshot.val() !== null) {
                prevPrevPlayed = {
                    title: snapshot.val().title,
                    image: snapshot.val().image
                }
                
                //setState
                this.setState({
                    ...this.state,
                    prevPlayed: prevPrevPlayed
                })
            }
        });
        let playlistRef = this.database.child('playlist/');
        playlistRef.on('child_added', (data) => {
            console.log("PLAYLIST UPDATE")
            this.updatePlaylist();

        })
        playlistRef.on('child_changed', (data)=> {
            console.log("PLAYLIST UPDATE")
            this.updatePlaylist();
        })
        playlistRef.on('child_removed',(data)=> {
            console.log("PLAYLIST UPDATE")
            this.updatePlaylist();
        })



    }

    onClickHandler = (key) => {
        //update the state and the json
        let clonedPlaylist = [...this.state.playlist];

        //update the count for song at key
        let songToUpdate = clonedPlaylist.find(x => x.key === key);
        songToUpdate.detail.count += 1;

        //order
        let updatedPlaylist = clonedPlaylist.sort(this.compare);

        //set state
        this.setState({
            ...this.state,
            playlist: updatedPlaylist
        }, (newKey = key) => {
            //make a firebase update to the specific record
            let countFrom = this.state.playlist.find(x => x.key === newKey);
            //setup update
            firebase.database().ref().child('/playlist/'+newKey)
                    .update({count: countFrom.detail.count});
        })
    }

    compare = (a, b) => {
        if (a.detail.count < b.detail.count) {
          return 1;
        }
        if (a.detail.count > b.detail.count) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }

    render() {

        let visibleStyle = {}
        if(!this.props.visible){
            visibleStyle.display = 'none';
        }

        let playlist = this.state.isLoading ? <Loading /> : null;
        if(this.state.playlist.length > 0) {
            playlist = this.state.playlist.map((data, index) => {
               return <PlaylistCard title={data.detail.title} key={index} clicked={() => this.onClickHandler(data.key)} count={data.detail.count}/>
            })
        }

        return(
            <div style={visibleStyle}>
            <Layout>
                <NowPlaying nowPlaying={this.state.nowPlaying} lastPlayed={this.state.lastPlayed} upNext={this.state.upNext} prevPlayed={this.state.prevPlayed}/>
                <div className={styles.playlistContainer}>
                    <h1 className={styles.header}>Current Playlist</h1>
                    {playlist}
                </div>
            </Layout>
            </div>
        );
    }
}

export default PlaylistContainer;