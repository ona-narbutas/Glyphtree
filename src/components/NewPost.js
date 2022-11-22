import React, { Component } from 'react';
import PostDisplay from '../containers/postDisplay';


export default function NewPost(props) {
  function clickHandler() {
    props.sendPost(props.textEntry);
    document.querySelector('#root-post').value = '';
  }
  return (
    <div className='post-container'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post' placeholder='Our story begins...' onChange={props.enterText}></textarea>
        <br></br>
        <button type='button' onClick={clickHandler}>Post</button>
      </form>
    </div>
  )
}