import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from '../components/Nav';
import Feed from '../components/Feed';
import WritePrompt from '../components/WritePrompt';

const Root = () => {
  return (
    <>
      <Nav />
      <main id="content">
        {/* <Outlet /> */}
        <WritePrompt />
        <Feed />
      </main>
    </>
  );
};

export default Root;
