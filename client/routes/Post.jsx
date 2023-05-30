import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Nav from '../components/Nav';

import serializeSlate from '../serializeSlate.js';
import { setChildren, selectPost } from '../slices/postSlice';

const Post = (props) => {
  // Redux
  const selectedPost = useAppSelector((state) => state.post.selectedPost);
  const dispatch = useAppDispatch();

  // Local State
  const [postInState, setPostInState] = useState(!!selectedPost);
  const [hasChildren, setHasChildren] = useState(false);
  const [contentString, setContentString] = useState('');

  // On mount, check for post in state. If none, fetch from backend and run again. If in state, fetch children.
  useEffect(() => {
    // if state is not set from UI navigation, fetch selected post data
    const fetchSelectedPost = async (postId) => {
      const sliceAfter = document.location.href.lastIndexOf('/');
      const id = document.location.href.slice(sliceAfter + 1);

      const response = await fetch(`/api/posts/${id}`);
      const post = await response.json();

      dispatch(selectPost(post));
    };

    const fetchChildren = async () => {
      const endpoint = `/api/posts/children/${selectedPost.post_id}`;
      const response = await fetch(endpoint);
      const children = await response.json();

      if (Array.isArray(children)) {
        dispatch(setChildren(children));
        setHasChildren(true);
      } else {
        setHasChildren(false);
      }
    };

    async function getData() {
      if (!postInState) {
        await fetchSelectedPost();
        setPostInState(true);
      } else {
        const initArr = JSON.parse(selectedPost.content);
        const serializedArr = initArr.map((el) => serializeSlate(el));
        setContentString(serializedArr.join(''));
      }
      fetchChildren();
    }

    getData();
  }, [postInState]);

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
