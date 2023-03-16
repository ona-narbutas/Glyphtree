import React from "react";
import type { Post } from '../../types'

const FeedItem: React.FC<Post> = (props: Post) => {
  const contentPreview = (props.content.length <= 1000) ? props.content : props.content.slice(0, 1000) + ' . . . '
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