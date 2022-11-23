import React, { Component } from 'react';
import { connect } from 'react-redux';
import LatestUserPost from '../components/LatestUserPost';
import RootsDisplay from './RootsDisplay';

const mapStateToProps = state => ({
  newPost: state.posts.newPost
})

class FeedDisplay extends React.Component {
  render() {
    console.log('hello?')
    console.log('in feed display: ', this.props.newPost)
    // async function waitForData()
    return (
      <div>
        <LatestUserPost newPost={this.props.newPost} newPostId={this.props.newPost._id} />
        <RootsDisplay />
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(FeedDisplay);