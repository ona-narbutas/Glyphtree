import React from 'react';
import { Link } from 'react-router-dom';

// import type { Post } from '../../types';
import serializeSlate from '../serializeSlate.js';

const FeedItem = (props) => {
  const initArr = JSON.parse(props.content);
  const serializedArr = initArr.map((el) => serializeSlate(el));
  console.log('initArr: ', initArr);
  console.log('serializedArr: ', serializedArr);
  const contentString = serializedArr.join('');
  return (
    <Link
      to={`posts/${props.post_id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div className="feed_item">
        <div
          className="post_content"
          dangerouslySetInnerHTML={{ __html: contentString }}
        ></div>
        <div className="post_metadata">
          <div className="post_author">{props.username}</div>
          <div className="post_timestap">{props.created_at}</div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;
