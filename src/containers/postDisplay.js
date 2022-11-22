import React, { Component } from 'react';
import NewPost from '../components/NewPost';

export default class PostDisplay extends React.Component {
  render() {
    return (
      <NewPost />
    )
  }
  sendPost() {
    // get text from textarea with id 'root-post'
    // fire action creator to update state with new post
    // send new post to DB
  }
}