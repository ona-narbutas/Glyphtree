import React, { Component } from 'react';
import { connect } from 'react-redux';
import LatestUserPost from '../components/LatestUserPost';

const mapStateToProps = state => ({
  newPost: state.posts.newPost
})

class FeedDisplay extends React.Component {
  render() {
    return (
      <LatestUserPost newPost={this.props.newPost}/>
    )
  }
}

export default connect(mapStateToProps, null)(FeedDisplay);