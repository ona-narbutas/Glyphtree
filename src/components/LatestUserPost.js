import React, { Component } from 'react';

export default function LatestUserPost (props) {
  console.log('received state: ', props.newPost)
  console.log('id', props.newPostId)
  return(
    <div className='latest-user-post' id={props.newPostId}>
      <p>{props.newPost.content}</p>
    </div>
  )
}