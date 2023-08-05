import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from './routes/Root';
import NotFound from './routes/NotFound';
import Post from './routes/Post';
import EditPage from './routes/EditPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root/home feed */}
        <Route path="/" element={<Root />}></Route>

        {/* Individual post */}
        <Route path="/posts/:post_id" element={<Post />} />

        {/* New root post */}
        <Route path="/newpost" element={<EditPage />} />

        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
