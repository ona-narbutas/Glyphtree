import React from "react";
import { Outlet } from 'react-router-dom';

import Nav from '../components/Nav';
import Feed from '../components/Feed'
import WritePrompt from "../components/WritePrompt";

const Root: React.FC = () => {
  return (
    <>
      <Nav />
      <div id='content'>
        {/* <Outlet /> */}
        <WritePrompt />
        <Feed />
      </div>
    </>
  )
}

export default Root;