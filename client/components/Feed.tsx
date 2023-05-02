import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import type {Post} from '../../types'
import FeedItem from './FeedItem';
import { buildFeed } from '../slices/postSlice';
import { setUser } from '../slices/userSlice';

const Feed: React.FC = () => {
  // fetch feed root posts from back end and save in post store's feed property
  // render each root as a Post component
  const postState = useAppSelector((state: RootState) => state.post);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchHomeFeed = async () => {
      try {
        const queryRes = await fetch('/api/posts');
        const queryResParsed  = await queryRes.json();
        console.log('feed: ', queryResParsed)
        if (queryResParsed.user.signedIn) dispatch(setUser(queryResParsed.user));
        dispatch(buildFeed(queryResParsed.feed));
        return queryResParsed.feed;
      } catch(err) {
        console.error('ERROR: ', err);
      }
    }
    fetchHomeFeed();
    // dispatch(fetchHomeFeed());
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