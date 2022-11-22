import React, { Component } from 'react';

export default function NewPost(props) {
  return (
    <div className='post-container'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post' onChange={props.enterText}></textarea>
        <br></br>
        <button type='button' onClick={() => {
          console.log(props.textEntry);
          props.sendPost(props.textEntry)
        }}>Post</button>
      </form>
    </div>
  )
}