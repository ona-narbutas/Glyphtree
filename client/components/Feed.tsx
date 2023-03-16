import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import type {Post} from '../../types'
import FeedItem from './FeedItem';
import { fetchHomeFeed } from '../slices/postSlice';

const Feed: React.FC = () => {
  // fetch feed root posts from back end and save in post store's feed property
  // render each root as a Post component
  const postState = useAppSelector((state: RootState) => state.post);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchHomeFeed());
  }, []);

  const feedItems: Array<React.ReactElement> = [];

  for (const el of postState.feed) {
    const feedItemProps: Post = {
      post_id: el.post_id,
      is_root: el.is_root,
      created_at: el.created_at,
      content: el.content,
      reads: el.reads,
      root_id: el.root_id,
      parent_id: el.parent_id,
      author_id: el.author_id,
      username: el.username
    }

    feedItems.push(<FeedItem {...feedItemProps} />)
  }


  return <div>
    {feedItems}
  </div>
}

export default Feed;