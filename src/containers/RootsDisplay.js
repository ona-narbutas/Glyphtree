import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({

})

class RootsDisplay extends React.Component {
  // logic: roots display should be subscribed to the most recent root posts in the DB via store
  // for each root post ind atabase, a rootPost component should be rendered containing that posts content
  render() { 
    return (
      <div>Hihi</div>
    )
  }
}

export default connect(mapStateToProps, null)(RootsDisplay);