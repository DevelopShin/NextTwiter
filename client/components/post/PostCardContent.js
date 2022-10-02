import React, { useState } from "react";
import Link from "next/link";
import { HashTag } from "./style";

function PostCardContent(props) {
  const postContent = props.postContent;
  const tag = /(#[^\s#]+)/g;

  return (
    <div>
      {postContent.split("\n").map((text, index) => {
        return (
          <span key={index}>
            {text.split(tag).map((word, index) => {
              if (word.match(/(#[^\s#]+)/)) {
                return (
                  <HashTag key={index} scroll={false}>
                    <Link href={`/hashtag/${word.slice(1)}`}>
                      <a>{word}</a>
                    </Link>
                  </HashTag>
                );
              }
              return word;
            })}

            <br />
          </span>
        );
      })}
    </div>
  );
}

export default PostCardContent;
