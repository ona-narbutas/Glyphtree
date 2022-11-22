import React, { Component } from 'react';
import '../public/App.css';
import PostDisplay from './containers/postDisplay';
import FeedDisplay from './containers/feedDisplay';

class App extends Component {
  render(){
    return(
      <div className='App'>
        <h1>Glyphtree</h1>
        <PostDisplay />
        <FeedDisplay />
      </div>
    );
  }
}

export default App;