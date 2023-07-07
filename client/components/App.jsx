import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from '../routes/Root';
import NotFound from '../routes/NotFound';
import Post from '../routes/Post';
import EditPage from '../routes/EditPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/posts/:post_id" element={<Post />} />
        <Route path="/newpost" element={<EditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
