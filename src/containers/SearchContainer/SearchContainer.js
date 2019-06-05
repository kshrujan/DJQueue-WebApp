import React, {Component} from 'react';
import axios from 'axios';
import YoutubeSearchList from '../../components/YoutubeSearchList/YoutubeSearchList';
import styles from './SearchContainer.module.css';

class SearchContainer extends Component {

    state = {
        searchKeyWord: "",
        isLoadingYoutubeResults: false,
        youtubeResults: []
    }

    onEnter = (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            //get the current entered query
            let query = event.target.value;

            this.setState({
                ...this.state,
                isLoadingYoutubeResults: true
            }, () => {
                //make the API call once enter is clicked
            axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q='+query+'&type=video&key=')
                 .then(response => {
                     //check to see if the data exsits
                    if(response.data) {
                         let data = response.data;
                         if(data.items) {
                             let items = data.items;

                             //set the state variable
                             this.setState({
                                 ...this.state,
                                 isLoadingYoutubeResults: false,
                                 youtubeResults: items
                             })
                            
                         }


                    }
                 })
                 .catch(error => {
                     console.log(error);
                 })
            })
        }
    }

    clearSearch = () => {
        //set the keyWoard to blank and the youtube results to blank as well.
        this.setState({
            ...this.state,
            searchKeyWord: "",
            isLoadingYoutubeResults: false,
            youtubeResults: []
        });
    }

    render() {


        return (
            <>
                <h1 className={styles.title}>Search</h1>
                <div className={styles.searchBoxContainer}>
                    <input type="text" className={styles.search} placeholder={"Search..."} onKeyDown={(event) => this.onEnter(event)}/>
                </div>
                <YoutubeSearchList data={this.state.youtubeResults} loading={this.state.isLoadingYoutubeResults} clearSearch={this.clearSearch}/>
            </>
        )
    }

}



export default SearchContainer;