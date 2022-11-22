import React, { Component } from 'react';
import { connect } from 'react-redux';
import LatestUserPost from '../components/LatestUserPost';
import RootsDisplay from './RootsDisplay';

const mapStateToProps = state => ({
  newPost: state.posts.newPost
})

class FeedDisplay extends React.Component {
  render() {
    return (
      <div>
        <LatestUserPost newPost={this.props.newPost} />
        <RootsDisplay />
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(FeedDisplay);