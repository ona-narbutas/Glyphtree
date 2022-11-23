import React, { Component } from 'react';

export default function LatestUserPost (props) {
  const currentID = (props.newPost) ? props.newPost._id : 0;
  const content = (props.newPost) ? props.newPost.content : '';
  return(
    <div className='latest-user-post' id={currentID}>
      <p>{content}</p>
    </div>
  )
}