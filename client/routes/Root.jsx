import React from 'react';

import Nav from '../components/Nav';
import Feed from '../components/Feed';
import WritePrompt from '../components/WritePrompt';

const Root = () => {
  return (
    <>
      <Nav />
      <main id="content">
        <WritePrompt />
        <Feed />
      </main>
    </>
  );
};

export default Root;
