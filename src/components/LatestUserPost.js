import React, { Component } from 'react';

export default function LatestUserPost (props) {
  const currentID = (props.newPost) ? props.newPost._id : 0;
  const content = (props.newPost) ? props.newPost.content : '';
  if (props.newPost) {
    return(
      <div className='feed-box' id={currentID}>
        {content}
        <div className='button-container'>
          <button>Continue!</button>
        </div>
      </div>
    )
  } else {
    return;
  }
}