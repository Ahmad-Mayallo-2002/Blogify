import React from "react";
import { Button } from "./ui/button";
import { getTokenId } from "@/app/assets/data";

interface MyComment {
  _id: string;
  body: string;
  createdAt: string;
  userId: {
    username: string;
    image: string;
    _id: string;
  };
  deleteComment: (id: string) => {};
}

export default function Comment({
  _id: commentId,
  body,
  createdAt,
  userId: { username, image, _id },
  deleteComment,
}: MyComment) {
  const commentDate = new Date(createdAt);
  const { id } = getTokenId();
  return (
    <>
      <div className="comment">
        {/* Head */}
        <div className="head mb-4 flex justify-between items-start">
          <div className="flex gap-4">
            <div>
              <img
                src={/https/.test(image) ? image : `/users_images/${image}`}
                className="w-[50px] h-[50px] rounded-full"
                alt="User Image"
              />
            </div>
            <div>
              <h3 className="mb-2">{username}</h3>
              <p>
                {commentDate.toLocaleDateString()}{" "}
                {commentDate.toLocaleTimeString()}
              </p>
            </div>
          </div>
          {id === _id && (
            <Button
              onClick={() => deleteComment(commentId)}
              className="bg-red-600 px-6 hover:bg-red-800 duration-300"
            >
              Delete
            </Button>
          )}
        </div>
        {/* Body */}
        <p>{body}</p>
      </div>
    </>
  );
}
