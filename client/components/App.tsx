import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { inputText } from '../slices/postSlice';

import Root from '../routes/Root';
import NotFound from '../routes/NotFound';
import Post from '../routes/Post';
import Editor from '../routes/Editor';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='posts/:post_id' element={<Post />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/newpost' element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;