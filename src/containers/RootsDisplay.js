import React, { Component } from 'react';
import { connect } from 'react-redux';
import auxFunctions from '../actions/auxFunctions.js';
import { feedActionCreator } from '../actions/actions';
import { continueTextActionCreator } from '../actions/actions';
import FeedItem from '../components/FeedItem.js'

const mapStateToProps = state => ({
  feed: state.posts.feed
})

const mapDispatchToProps = dispatch => ({
  loadFeed: (feedData) => {
    dispatch(feedActionCreator(feedData))
  },
  continue: (parentId) => {
    dispatch(continueTextActionCreator(parentId))
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
    // this.props.loadFeed(auxFunctions.loadFeedIntermediary());
    console.log('rendering RootsDisplay')
    console.log('RootDisplay props:', this.props)
    let feedItemArray = [];
    for (const item in this.props.feed) {
      // console.log('iterating over this.props.feed')
      if (!document.getElementById(`${this.props.feed[item]._id}`)) {
        feedItemArray.push(<FeedItem _id={
          this.props.feed[item]._id} 
          key={this.props.feed[item]._id} 
          content={this.props.feed[item].content}
          continue={this.props.continue} />)
      }
    }
    feedItemArray = feedItemArray.reverse();
    return (
      <>{feedItemArray}</>
    )
  }
  async componentDidMount () {
    // execute auxiliary function that fetches feed
    // execute this.props.loadFeed with the result
    // return this.props.loadFeed(auxFunctions.loadFeedIntermediary());
    const feed = await auxFunctions.loadFeedIntermediary();
    this.props.loadFeed(feed);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootsDisplay);