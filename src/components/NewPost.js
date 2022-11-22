import React, { Component } from 'react';
import PostDisplay from '../containers/postDisplay';


export default function NewPost(props) {
  function clickHandler() {
    props.sendPost(props.textEntry);
    document.querySelector('#root-post').value = '';
    console.log('props: ', props)
    // console.log('textEntry: ', props.textEntry);
    // console.log('newPost: ', props.newPost)
  }
  return (
    <div className='post-container'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post' onChange={props.enterText}></textarea>
        <br></br>
        <button type='button' onClick={clickHandler}>Post</button>
      </form>
    </div>
  )
}