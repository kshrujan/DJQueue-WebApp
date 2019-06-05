import React, {Component} from 'react';
import './App.css';

import NavBar from './components/NavigationBar/NavigationBar';
import Layout from './hoc/Layout/Layout';
import MainContainer from './containers/MainContainer/MainContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp);

class App extends Component {
	state = {
    
        visible:'playlist'//search
    };

  	setVisible(vis){
        if(vis === 'search' || vis === 'playlist'){
            this.setState({visible:vis})
        }
        
    }

	render(){
		
		return (
	    <Layout>
	        <NavBar navHome={()=>{this.setVisible('playlist')}} navSearch={()=>{this.setVisible('search')}}/>
	        <MainContainer visible={this.state.visible}/>
	    </Layout> 
	  );
	}
  
}

export default App;
