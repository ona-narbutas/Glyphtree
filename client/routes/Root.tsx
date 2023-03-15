import React from "react";
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed'

import Nav from '../components/Nav';

const Root: React.FC = () => {
  return (
    <>
      <Nav />
      <div id='content'>
        {/* <Outlet /> */}
        <Feed />
      </div>
    </>
  )
}

export default Root;