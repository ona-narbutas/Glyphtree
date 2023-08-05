import React from 'react';
import { Link } from 'react-router-dom';

import type { Post } from '../../types';
import serializeSlate from '../serializeSlate.js';

interface FeedItemProps extends Post {
  handleClick: (post: Post) => void;
}

const FeedItem = (props: FeedItemProps) => {
  const initArr = JSON.parse(props.content);
  const serializedArr = initArr.map((el: any) => serializeSlate(el));
  const contentString = serializedArr.join('');

  return (
    <Link className="w-full" to={`/posts/${props.post_id}`}>
      <div className="@container/item">
        <article
          className="bg-white flex flex-col justify-between p-2 m-2 h-36 border border-solid border-sky-200 rounded shadow-md shadow-blue-200 hover:border-sky-300 hover:shadow-blue-400 hover:scale-1015 @xl/item:flex-row"
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
          <div className="overflow-clip w-3/4 p-2 text-transparent bg-clip-text bg-gradient-to-b from-slate-950 to-slate-400">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: contentString }}
            ></div>
          </div>
          <div className="text-sm w-1/4 p-2">
            <div className="font-bold">{props.username}</div>
            <div className="font-light">{props.created_at}</div>
          </div>
        </article>
      </div>
    </Link>
  );
};

export default FeedItem;
