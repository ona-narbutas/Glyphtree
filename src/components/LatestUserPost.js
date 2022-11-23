import React, { Component } from 'react';

export default function LatestUserPost (props) {
  console.log(props.newPost)
  return(
    <div id='latest-user-post'>
      <p>test</p>
      <p>{props.newPost}</p>
    </div>
  )
}