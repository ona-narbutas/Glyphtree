import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
// import type { RootState } from '../store';
import type { Post } from '../../types';
import FeedItem from './FeedItem';
import { buildFeed, deselectPost, selectPost } from '../slices/postSlice';
import { setUser } from '../slices/userSlice';

const Feed = () => {
  // fetch feed root posts from back end and save in post store's feed property
  // render each root as a Post component
  const postState = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchHomeFeed = async () => {
      try {
        const queryRes = await fetch('/api/posts');
        const queryResParsed = await queryRes.json();

        if (queryResParsed.user?.signedIn) {
          dispatch(setUser(queryResParsed.user));
        }

        dispatch(buildFeed(queryResParsed.feed));
        return queryResParsed.feed;
      } catch (err) {
        console.error('ERROR: ', err);
      }
    };

    fetchHomeFeed();
    dispatch(deselectPost());
  }, []);

  const handleClick = (target: Post) => {
    dispatch(selectPost(target));
  };

  const feedItems = [];

  for (const el of postState.feed) {
    const feedItemProps = {
      post_id: el.post_id,
      is_root: el.is_root,
      created_at: el.created_at,
      content: el.content,
      reads: el.reads,
      root_id: el.root_id,
      parent_id: el.parent_id,
      author_id: el.author_id,
      username: el.username,
      title: el.title,
      handleClick: handleClick,
    };

    feedItems.push(<FeedItem {...feedItemProps} key={el.post_id} />);
  }

  return <div>{feedItems}</div>;
};

export default Feed;
