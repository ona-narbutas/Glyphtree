import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import CreateIcon from '@mui/icons-material/Create';

import Nav from '../components/Nav';
import Edit from '../components/Edit';
import FeedItem from '../components/FeedItem';

import serializeSlate from '../serializeSlate.js';
import { setChildren, selectPost } from '../slices/postSlice';

import { Post } from '../../types';

const Post = () => {
  // Redux
  const selectedPost = useAppSelector((state) => state.post.selectedPost);

  const dispatch = useAppDispatch();

  // Local State
  const [postInState, setPostInState] = useState<boolean>(!!selectedPost);
  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [contentString, setContentString] = useState<string>('');
  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  // On mount, check for post in state. If none, fetch from backend and run again. If in state, fetch children.
  useEffect(() => {
    // if state is not set from UI navigation, fetch selected post data
    const fetchSelectedPost = async () => {
      console.log('fetchSelectedPost() fired');
      const sliceAfter = document.location.href.lastIndexOf('/');
      const id = document.location.href.slice(sliceAfter + 1);
      console.log('post id: ', id);

      const response = await fetch(`/api/posts/${id}`);
      const post = await response.json();
      console.log('dispatching select post for post: ', post);

      dispatch(selectPost(post));
    };

    const fetchChildren = async () => {
      if (selectedPost === null) {
        throw new Error('no post selected');
      }
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
        console.log('no post in state, fetching selected post from server');
        await fetchSelectedPost();
        setPostInState(true);
      } else if (selectedPost) {
        const initArr = JSON.parse(selectedPost.content);
        const serializedArr = initArr.map((el: any) => serializeSlate(el));
        setContentString(serializedArr.join(''));
      }
      fetchChildren();
    }

    getData();
  }, [postInState]);

  const handleChildClick = (target: Post) => {
    setHasChildren(false);
    setPostInState(false);
    console.log('selecting child post');
    console.log('target: ', target);
    dispatch(selectPost(target));
  };

  const childArr: JSX.Element[] = [];
  if (selectedPost?.children && hasChildren) {
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
        title: el.title ? el.title : '',
        handleClick: handleChildClick,
      };

      childArr.push(<FeedItem {...childProps} key={el.post_id} />);
    });
  }

  return (
    <>
      <Nav />
      <main>
        <div className="read_edit_container relative">
          <article className="selected_post">
            <div className="post_metadata">
              <h3 className="font-bold mb-2">
                {!selectedPost?.is_root && (
                  <span className="italic">from </span>
                )}
                {selectedPost && selectedPost.title?.length
                  ? selectedPost.title
                  : 'Untitled'}
              </h3>
            </div>
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
            className="absolute bottom-1.5 right-1.5 rounded-full border-slate-400 border-2 h-16 w-16"
            id="continue_button"
            onClick={() => setEditorVisible(!editorVisible)}
          >
            <CreateIcon fontSize="large" color="primary" />
          </button>
        </div>
        <div className="post_children flex w-full">
          {hasChildren ? childArr : <p>No children</p>}
        </div>
      </main>
    </>
  );
};

export default Post;
