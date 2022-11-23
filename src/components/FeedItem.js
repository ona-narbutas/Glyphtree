import React, { Component } from 'react';

export default function FeedItem (props) {
  function clickHandler() {
    console.log('parentId in click: ', props._id);
    props.continue(props._id)
  }
  return (
    <div className='feed-box' id={props._id}>
      {props.content}
      <div className='button-container'>
        {/* <button onClick={clickHandler}>Continue!</button> */}
        <button onClick={clickHandler}>Continue!</button>
      </div>
      </div>
  )
}