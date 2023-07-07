import React from 'react';
import { Link } from 'react-router-dom';

// import type { Post } from '../../types';
import serializeSlate from '../serializeSlate.js';

const FeedItem = (props) => {
  const initArr = JSON.parse(props.content);
  const serializedArr = initArr.map((el) => serializeSlate(el));
  const contentString = serializedArr.join('');
  return (
    <Link
      to={`posts/${props.post_id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <article
        className="feed_item"
        onClick={() =>
          props.handleClick({
            post_id: props.post_id,
            is_root: props.is_root,
            created_at: props.created_at,
            content: props.content,
            reads: props.reads,
            root_id: props.root_id,
            parent_id: props.parent_id,
            author_id: props.author_id,
            username: props.username,
          })
        }
      >
        <div
          className="post_content"
          dangerouslySetInnerHTML={{ __html: contentString }}
        ></div>
        <div className="post_metadata">
          <div className="post_author">{props.username}</div>
          <div className="post_timestap">{props.created_at}</div>
        </div>
      </article>
    </Link>
  );
};

export default FeedItem;
