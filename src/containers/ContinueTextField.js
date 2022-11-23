import React, { Component } from 'react';
import { connect } from 'react-redux';
import LatestUserPost from '../components/LatestUserPost';
import RootsDisplay from './RootsDisplay';

const mapStateToProps = state => ({
  parentId: state.posts.parentId
})

class ContinueTextField extends React.Component {
  render() {
    <div className='continue-focus'>
      <form className='root-post'>
        <textarea className='text-field' name='text-field' id='root-post' placeholder='Our story begins...' onChange={props.enterText}></textarea>
        <br></br>
        <div className='button-container'>
          <button type='button' >Post</button>
        </div>
      </form>
    </div>
  }
}

export default connect(mapStateToProps, null)(ContinueTextField);