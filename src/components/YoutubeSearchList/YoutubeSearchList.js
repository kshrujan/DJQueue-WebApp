import React, {Component} from 'react';
import SearchCard from './YoutubeSearchCard/YoutubeSearchCard';
import Loading from '../../components/UI/Loading/Loading';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import * as firebase from 'firebase';
import 'firebase/database';

class YoutubeSearchList extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref().child('playlist');
        this.state = {
            loading: false
        }
    }

    onClickHandler = (title, url, image) => {
        this.database.push().set({
            title: title,
            url: url,
            count: 0,
            image: image
        }, () => {
            this.props.history.push("/");
        })
        // this.setState({
        //     ...this.state,
        //     loading: true
        // }, () => {
        //     let obj = {
        //         title: title,
        //         url: url,
        //         count: 0,
        //         image: image
        //     };
    
        //     //make a post call to our backend to store the song data
        //     axios.post('https://djqueue.firebaseio.com/playlist.json', obj)
        //          .then(response => {
        //              this.props.clearSearch();
        //              this.setState({
        //                  ...this.state,
        //                  loading: false
        //              }, () => {
        //                  this.props.history.push("/");
        //              })
        //          })
        //          .catch(error => {
        //              console.log(error);
        //          })
        // })
    }

    componentWillUnmount = () => {
        this.database.off('value');
    }
    
    render() {
        let cards = this.props.loading || this.state.loading ? <Loading /> : null;

        if(this.props.data.length > 0) {
            //loop through the data and return to cards
            cards = this.props.data.map((result, index) => {
                let snippet = result.snippet;
                return <SearchCard key={index} image={snippet.thumbnails.high.url} title={snippet.title} summary={snippet.description} url={result.id.videoId} onClick={this.onClickHandler}/>
            });
        }
        return(
            <div>
                {cards}
            </div>
        );
    }
}

export default withRouter(YoutubeSearchList);