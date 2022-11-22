import React, { Component } from 'react';

export default function LatestUserPost(props) {
  return(
    <div id='latest-user-post'>
      <p>{props.newPost}</p>
    </div>
  )
}