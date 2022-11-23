import React, { Component } from 'react';
import { connect } from 'react-redux';
import auxFunctions from '../actions/auxFunctions.js';
import { feedActionCreator } from '../actions/actions';
import FeedItem from '../components/FeedItem.js'

const mapStateToProps = state => ({
  feed: state.posts.feed
})

const mapDispatchToProps = dispatch => ({
  loadFeed: (feedData) => {
    dispatch(feedActionCreator(feedData))
  }
})


class RootsDisplay extends React.Component {
  // logic: roots display should be subscribed to the most recent root posts in the DB via store
  // for each root post ind atabase, a rootPost component should be rendered containing that posts content
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  render() {
    // for each item in this.props.feed, if querySelector for that item's id is null, add a FeedItem component to an array that will be renderd
    const feedItemArray = [];
    for (const item in this.props.feed) {
      if (!document.querySelector(`#${this.props.feed[item]}`)) {
        feedItemArray.push(<FeedItem />)
      }
    }
    return (
      <>{feedItemArray}</>
    )
  }
  componentDidMount() {
    // execute auxiliary function that fetches feed
    // execute this.props.loadFeed with the result
    return this.props.loadFeed(auxFunctions.loadFeedIntermediary());
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootsDisplay);