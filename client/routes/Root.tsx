import React from "react";
import { Outlet } from 'react-router-dom';

import Nav from '../components/Nav';

const Root: React.FC = () => {
  return (
    <>
      <Nav />
      <div id='content'>
        <Outlet />
      </div>
    </>
  )
}

export default Root;