import React, { Component } from 'react';

export default function FeedItem (props) {
  console.log('rendering FeedItem')
  console.log('FeedItem props ', props)
  return (
    <div id={props._id}>{props.content}</div>
  )
}