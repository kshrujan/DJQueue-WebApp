import React from 'react';
import './App.css';
import NavBar from './components/NavigationBar/NavigationBar';
import Layout from './hoc/Layout/Layout';
import MainContainer from './containers/MainContainer/MainContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp);

function App() {
  return (
    <Layout>
        <NavBar/>
        <MainContainer />
    </Layout> 
  );
}

export default App;
