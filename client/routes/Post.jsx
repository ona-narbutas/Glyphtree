import React, { useEffect } from 'react';
import { RootState } from '../store';
import { Props } from '../../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import Nav from '../components/Nav';

import serializeSlate from '../serializeSlate.js';

const Post = (props) => {
  const selectedPost = useAppSelector((state) => state.post.selectedPost);
  const dispatch = useAppDispatch();

  const initArr = JSON.parse(selectedPost.content);
  const serializedArr = initArr.map((el) => serializeSlate(el));
  const contentString = serializedArr.join('');

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `/api/posts/children/${selectedPost.post_id}`
      );
      const children = await response.json();
      console.log(children);
    };

    fetchChildren();
  }, []);

  return (
    <>
      <Nav />
      <div className="post_metadata"></div>
      <article className="selected_post">
        <div dangerouslySetInnerHTML={{ __html: contentString }}></div>
      </article>
      <div className="post_children"></div>
    </>
  );
};

export default Post;
