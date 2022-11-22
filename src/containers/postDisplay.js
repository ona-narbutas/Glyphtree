import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state =>({
  newPost: state.posts.newPost
})

const mapDispatchToProps = dispatch => ({
  newPost: (postData) => dispatch(newPostActionCreator(postData))
})

import NewPost from '../components/NewPost';

class PostDisplay extends React.Component {
  render() {
    return (
      <NewPost />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);