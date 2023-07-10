import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import CreateIcon from '@mui/icons-material/Create';

import Nav from '../components/Nav';
import Edit from '../components/Edit';
import FeedItem from '../components/FeedItem';

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
  const [editorVisible, setEditorVisible] = useState(false);

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
      console.log('endpoint: ', endpoint);
      console.log('selectedPost: ', selectedPost);

      const response = await fetch(endpoint);
      const children = await response.json();
      console.log('children: ', children);

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

  const handleChildClick = (target) => {
    setHasChildren(false);
    setPostInState(false);
    dispatch(selectPost(target));
  };

  const childArr = [];
  if (hasChildren) {
    selectedPost.children.forEach((el) => {
      const childProps = {
        post_id: el.post_id,
        is_root: el.is_root,
        created_at: el.created_at,
        content: el.content,
        reads: el.reads,
        root_id: el.root_id,
        parent_id: el.parent_id,
        author_id: el.author_id,
        username: el.username,
        handleClick: handleChildClick,
      };

      childArr.push(<FeedItem {...childProps} key={el.post_id} />);
    });
  }

  return (
    <>
      <Nav />
      <main>
        <div className="read_edit_container">
          <article className="selected_post">
            <div className="post_metadata"></div>
            <div
              className="selected_post_content"
              dangerouslySetInnerHTML={{ __html: contentString }}
            ></div>
          </article>
          {editorVisible && (
            <div className="edit_panel">
              <Edit />
            </div>
          )}
          <button
            id="continue_button"
            onClick={() => setEditorVisible(!editorVisible)}
          >
            <CreateIcon fontSize="large" color="primary" />
          </button>
        </div>
        <div className="post_children">
          {hasChildren ? childArr : <p>No children</p>}
        </div>
      </main>
    </>
  );
};

export default Post;
