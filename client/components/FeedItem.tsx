import React from "react";
import type { Post } from '../../types'

const FeedItem: React.FC<Post> = (props: Post) => {
  return <div className='feed_item'>
    <div className='post_content'>
      {props.content}
    </div>
    <div className='post_metadata'>
      <div className='post_author'>{props.username}</div>
      <div className='post_timestap'>{props.created_at}</div>
    </div>
  </div>
}

export default FeedItem;