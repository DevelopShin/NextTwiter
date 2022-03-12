
import React from 'react';
import {Cards} from './Cards';
import {RetweetCards} from './RetweetCards'
function PostCard(props) {
  const post = props.post
  
  return (
    <>
      {post.Retweet
      ? <RetweetCards post = {post}/>
      :  <Cards post = {post}/>}
    </>
  );
}


export default PostCard;
