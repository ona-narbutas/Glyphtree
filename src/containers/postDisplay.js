import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enterTextActionCreator } from '../actions/actions';
import { newPostActionCreator } from '../actions/actions';
import { submitChildActionCreator } from '../actions/actions'

import NewPost from '../components/NewPost';

const mapStateToProps = state => ({
  newPost: state.posts.newPost,
  textEntry: state.posts.textEntry,
  parentId: state.posts.parentId
})

const mapDispatchToProps = dispatch => ({
  sendPost: (postData) => {
    console.log(postData);
    dispatch(newPostActionCreator(postData))
  }, // create post on button click
  enterText: () => {
    const textBox = (document.querySelector('#root-post')) ? document.querySelector('#root-post') : document.querySelector('#continue-post');
    dispatch(enterTextActionCreator(textBox.value))
  }, // update current state of textEntry as text is entered
  submitChild: (childData) => {
    console.log(childData);
    dispatch(submitChildActionCreator(childData))
  }
})


class PostDisplay extends React.Component {
  render() {
    return (
      <NewPost 
        textEntry = {this.props.textEntry} 
        newPost = {this.props.newPost}
        sendPost = {this.props.sendPost} 
        enterText = {this.props.enterText}
        parentId = {this.props.parentId}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);