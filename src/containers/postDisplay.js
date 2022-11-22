import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enterTextActionCreator } from '../actions/actions';
import { newPostActionCreator } from '../actions/actions';

import NewPost from '../components/NewPost';

const mapStateToProps = state => ({
  newPost: state.posts.newPost,
  textEntry: state.posts.textEntry
})

const mapDispatchToProps = dispatch => ({
  sendPost: (postData) => dispatch(newPostActionCreator(postData)), // create post on button click
  enterText: () => dispatch(enterTextActionCreator(document.querySelector('#root-post').value)) // update current state of textEntry as text is entered
})


class PostDisplay extends React.Component {
  render() {
    return (
      <NewPost 
        textEntry = {this.props.textEntry} 
        newPost = {this.props.newPost}
        sendPost = {this.props.sendPost} 
        enterText = {this.props.enterText}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);