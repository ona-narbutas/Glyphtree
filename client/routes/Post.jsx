import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Nav from '../components/Nav';

import serializeSlate from '../serializeSlate.js';
import setChildren from '../slices/postSlice';

const Post = (props) => {
  const selectedPost = useAppSelector((state) => state.post.selectedPost);
  const dispatch = useAppDispatch();

  const [hasChildren, setHasChildren] = useState(false);

  const initArr = JSON.parse(selectedPost.content);
  const serializedArr = initArr.map((el) => serializeSlate(el));
  const contentString = serializedArr.join('');

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `/api/posts/children/${selectedPost.post_id}`
      );
      const children = await response.json();
      if (Array.isArray(children)) {
        dispatch(setChildren(children));
        setHasChildren(true);
      } else {
        console.log('no children');
        setHasChildren(false);
      }
    };

    fetchChildren();
  }, []);

  const childArr = [];

  return (
    <>
      <Nav />
      <article className="selected_post">
        <div className="post_metadata"></div>
        <div
          className="selected_post_content"
          dangerouslySetInnerHTML={{ __html: contentString }}
        ></div>
      </article>
      <div className="post_children">
        {hasChildren ? childArr : <p>No children</p>}
      </div>
    </>
  );
};

export default Post;
