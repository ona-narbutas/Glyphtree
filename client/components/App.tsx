import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Root from '../routes/Root';
import NotFound from '../routes/NotFound';
import Post from '../routes/Post';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='posts/:post_id' element={<Post />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;