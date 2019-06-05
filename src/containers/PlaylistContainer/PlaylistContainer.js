import React, {Component} from 'react';
import styles from './PlaylistContainer.module.css';
import PlaylistCard from './PlaylistCard/PlaylistCard';
import axios from 'axios';
import Loading from '../../components/UI/Loading/Loading';
import Layout from '../../hoc/Layout/Layout';
import NowPlaying from '../NowPlaying/NowPlaying';
import * as firebase from 'firebase';


class PlaylistContainer extends Component {

    constructor(props) {
        super(props);
        this.database = firebase.database().ref().child('nowplaying');
        this.state = {
            playlist: [],
            isLoading: false,
            nowPlaying:{},
            keys: []
        };
    }


    componentDidMount = () => {
        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            //make a call to retrieve the current playlist
            axios.get('https://djqueue.firebaseio.com/playlist.json')
            .then(response => {
                //loop through and place data in an array
                let data = Object.values(response.data);
                let keys = Object.keys(response.data);

                //sort playlist
                let sortedData = data.sort(this.compare);

                //now set the state for the data
                this.setState({
                    ...this.state,
                    playlist: sortedData,
                    isLoading: false,
                    keys: keys
                })
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

    componentWillMount = () => {
        let prevNowPlaying = this.state.nowPlaying;

        //setup listener
        this.database.on('value', (snapshot, index) => {
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
        }, (newIndex = index) => {
            //make a firebase update to the specific record

            //get the key for firebase
            let key  = this.state.keys[newIndex];
            console.log("index: ", key);
            //setup update
            firebase.database().ref().child('/playlist/'+key)
                    .update({count: this.state.playlist[newIndex].count});
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

        return(
            <Layout>
                <NowPlaying current={Object.entries(this.state.nowPlaying).length > 0 ? this.state.nowPlaying : null}/>
                <div className={styles.playlistContainer}>
                    <h1 className={styles.header}>Current Playlist</h1>
                    {playlist}
                </div>
            </Layout>
        );
    }
}

export default PlaylistContainer;