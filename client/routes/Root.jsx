import React from 'react';

import Nav from '../components/Nav';
import Feed from '../components/Feed';
import WritePrompt from '../components/WritePrompt';

const Root = () => {
  return (
    <>
      <Nav />
      <main id="content" className="bg-slate-100 h-screen">
        <WritePrompt />
        <Feed />
      </main>
    </>
  );
};

export default Root;
