import React, { Component } from 'react';

export default function NewPost(props) {
  return (
    <div className='post-container'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post'></textarea>
        <br></br>
        <button type='button' onClick={props.sendPost}>Post</button>
      </form>
    </div>
  )
}