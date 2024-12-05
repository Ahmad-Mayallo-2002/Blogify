import React, { FC } from "react";
import { Button } from "./ui/button";
import { Heading } from "@chakra-ui/react";
import Link from "next/link";

interface Post {
  _id: string;
  id: string;
  title: string;
  body: string;
  image: string;
  createdAt: string;
  category: string;
  userId: {
    _id: string;
    username: string;
    image: string;
  };
  handleDeletePost: (id: string) => {};
}

export default function PostCard({
  _id,
  title,
  body,
  image,
  createdAt,
  category,
  userId,
  id,
  handleDeletePost,
}: Post) {
  const postDate = new Date(createdAt);
  const localDate = postDate.toLocaleDateString();
  const localTime = postDate.toLocaleTimeString();

  return (
    <div className="flex post gap-4 md:flex-row flex-col">
      <div>
        {image && (
          <img
            src={`/posts_images/${image}`}
            alt="Post Image"
            className="md:w-[200px] md:h-full w-full h-[200px]"
          />
        )}
      </div>
      <div className="grow flex flex-col justify-between md:gap-y-0 gap-y-2">
        <div>
          <Heading className="mb-2">{title}</Heading>
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "350px",
              overflow: "hidden",
              marginBottom: ".5rem",
            }}
          >
            {body}
          </p>
          <p>Category: {category}</p>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <img
            src={
              /https/.test(userId.image)
                ? userId.image
                : `/users_images/${userId.image}`
            }
            className="w-[60px] h-[60px] rounded-full"
            alt="User Image"
          />
          <div>
            <Heading className="mb-2">{userId.username}</Heading>
            <p>
              {localDate} {localTime}
            </p>
          </div>
        </div>
        <Link
          href={`/Blog/${_id}`}
          className="block w-fit py-2 px-6 border-2 border-greenColor text-greenColor hover:bg-greenColor hover:text-white duration-300"
        >
          Show More
        </Link>
      </div>
      {id === userId._id && (
        <Button
          onClick={() => handleDeletePost(_id)}
          className="px-6 bg-red-600 hover:bg-red-800 duration-300"
        >
          Delete
        </Button>
      )}
    </div>
  );
}
