import React, { Component } from 'react';
import PostDisplay from '../containers/postDisplay';
import auxFunctions from '../actions/auxFunctions.js'

export default function NewPost(props) {
  async function clickHandler() {
    // props.sendPost(auxFunctions.newPostIntermediary(props.textEntry));
    const data = await auxFunctions.newPostIntermediary(props.textEntry);
    props.sendPost(data);
    console.log('data in click handler: ', data);
    document.querySelector('#root-post').value = '';
  }
  return (
    <div className='post-container'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post' placeholder='Our story begins...' onChange={props.enterText}></textarea>
        <br></br>
        <div className='button-container'>
          <button type='button' onClick={clickHandler}>Post</button>
        </div>
      </form>
    </div>
  )
}