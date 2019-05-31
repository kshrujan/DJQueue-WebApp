import React, {Component} from 'react';
import SearchCard from './YoutubeSearchCard/YoutubeSearchCard';
import Loading from '../../components/UI/Loading/Loading';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class YoutubeSearchList extends Component {

    state = {
        loading: false
    }

    onClickHandler = (title, url, image) => {
        this.setState({
            ...this.state,
            loading: true
        }, () => {
            let obj = {
                title: title,
                url: url,
                count: 0,
                image: image
            };
    
            //make a post call to our backend to store the song data
            axios.post('https://djqueue.firebaseio.com/playlist.json', obj)
                 .then(response => {
                     this.props.clearSearch();
                     this.setState({
                         ...this.state,
                         loading: false
                     }, () => {
                         this.props.history.push("/");
                     })
                 })
                 .catch(error => {
                     console.log(error);
                 })
        })
    }
    
    render() {
        let cards = this.props.loading || this.state.loading ? <Loading /> : null;

        if(this.props.data.length > 0) {
            //loop through the data and return to cards
            cards = this.props.data.map((result, index) => {
                let snippet = result.snippet;
                return <SearchCard key={index} image={snippet.thumbnails.high.url} title={snippet.title} summary={snippet.description} url={result.id.videoId} onClick={this.onClickHandler} image={snippet.thumbnails.high.url}/>
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