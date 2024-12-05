"use client";
import { getTokenId, mainUrl } from "@/app/assets/data";
import Comment from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Container, Heading, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

interface MyPost {
  _id: string;
  title: string;
  body: string;
  image: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    image: string;
  };
}

interface UserComment {
  body: string;
}

interface MyComment {
  _id: string;
  body: string;
  createdAt: string;
  userId: {
    username: string;
    image: string;
    _id: string;
  };
}

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserComment>();
  const { token, id: userId } = getTokenId();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<MyComment[]>([]);
  const [post, setPost] = useState<MyPost>({
    _id: "",
    title: "",
    body: "",
    image: "",
    createdAt: "",
    userId: {
      _id: "",
      username: "",
      image: "",
    },
  });
  // Get Post Id
  const getId = async () => {
    const id = (await params).id;
    return id;
  };
  // Get Post Comments
  const getCommentsData = async () => {
    try {
      setLoading(true);
      const id = await getId();
      const { data } = await axios.get(mainUrl + "get-comments/" + id);
      setComments(data);
    } catch (error: any) {
      console.log(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  // Handle Like
  const handleLike = async (postId: string) => {
    try {
      setStatus((prevStatus) => {
        if (prevStatus === "like") {
          setLikes((prevLikes) => prevLikes - 0.5); // Remove like
          return null;
        } else {
          if (prevStatus === "dislike") {
            setDislikes((prevDislikes) => prevDislikes - 0.5); // Remove dislike if switching
          }
          setLikes((prevLikes) => prevLikes + 0.5); // Add like
          return "like";
        }
      });
      const { data } = await axios.patch(mainUrl + `like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Dis Like
  const handleDislike = async (postId: string) => {
    try {
      setStatus((prevStatus) => {
        if (prevStatus === "dislike") {
          setDislikes((prevDislikes) => prevDislikes - 0.5); // Remove dislike
          return null;
        } else {
          if (prevStatus === "like") {
            setLikes((prevLikes) => prevLikes - 0.5); // Remove like if switching
          }
          setDislikes((prevDislikes) => prevDislikes + 0.5); // Add dislike
          return "dislike";
        }
      });
      const { data } = await axios.patch(mainUrl + `dislike/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // Use Effect For Get Posts
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const id = await getId();
        const { data } = await axios.get(mainUrl + "get-posts/" + id);
        setPost(data);
        setLikes(data.likes.length);
        setDislikes(data.disLikes.length);
        if (data.likes.includes(userId)) setStatus("like");
        if (data.disLikes.includes(userId)) setStatus("dislike");
      } catch (error: any) {
        console.log(error.response.data.msg);

        setLoading(false);
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  // Use Effet For Get Posts Comments
  useEffect(() => {
    getCommentsData();
  }, []);
  // Handle Submit For Write Comment
  const onSubmit = async (userData: UserComment) => {
    const postId = await getId();
    try {
      setCommentLoading(true);
      const { data } = await axios.post(
        mainUrl + `add-comment/${postId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        }
      );
      toaster.success({
        title: "Success",
        description: data.msg,
        duration: 2500,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      getCommentsData();
    } catch (error) {
      setCommentLoading(false);
      console.log(error);
    } finally {
      setCommentLoading(false);
    }
  };
  // Handle Delete Comment
  const handleDeleteComment = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + "delete-comment/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      toaster.success({
        title: "Success",
        duration: 2500,
        description: data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      getCommentsData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="py-16">
        <Container className="mx-auto">
          {loading ? (
            <div className="h-[calc(100vh-73px-8rem-79px)] center-flex">
              <Spinner
                size="xl"
                borderColor="var(--greenColor)"
                className="border-[10px] border-greenColor !border-t-transparent"
                animationDuration="750ms"
                width={100}
                height={100}
              />
            </div>
          ) : error ? (
            <div className="h-[calc(100vh-73px-8rem-79px)] center-flex">
              <Heading fontSize={36} className="text-center">
                This Post is Not Found
              </Heading>
            </div>
          ) : (
            <div>
              {/* Post Image */}
              {post.image && (
                <img
                  src={`/posts_images/${post.image}`}
                  alt="Post Image"
                  className="w-full h-[300px] mb-4"
                />
              )}
              {/* User */}
              <div className="user flex items-center gap-4">
                <figure>
                  {post.userId.image && (
                    <img
                      src={`/users_images/${post.userId.image}`}
                      alt="User Image"
                      className="w-[75px] h-[75px] rounded-full"
                    />
                  )}
                </figure>
                <figcaption>
                  <h3>{post.userId.username}</h3>
                  <p>
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </p>
                </figcaption>
              </div>
              {/* Post Content */}
              <div>
                <Heading as="h2" fontSize={36}>
                  {post.title}
                </Heading>
                <p style={{ whiteSpace: "pre-wrap" }}>{post.body}</p>
              </div>
              {/* Post Likes and DisLikes */}
              <div className="likes flex items-center justify-between">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center gap-2 hover:text-blue-600 ${
                    status === "like" ? "text-blue-600" : ""
                  }`}
                >
                  <BiSolidLike className="text-[36px]" />
                  Like {likes}
                </button>
                <button
                  onClick={() => handleDislike(post._id)}
                  className={`flex items-center gap-2 hover:text-blue-600 ${
                    status === "dislike" ? "text-blue-600" : ""
                  }`}
                >
                  <BiSolidDislike className="text-[36px]" />
                  Dislike {dislikes}
                </button>
              </div>
              {/* Write Comment Box */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 flex gap-4"
              >
                <Field errorText={errors.body?.message}>
                  <Input
                    {...register("body", {
                      required: "Comment Content is Required",
                    })}
                    className="outline-0 px-4 border-2"
                    placeholder="Write Comment"
                  />
                </Field>
                <Button
                  loading={commentLoading}
                  loadingText="Loading..."
                  className="px-6 bg-blue-600 hover:bg-blue-700 duration-300"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
              {/* Comments */}
              <div className="comments">
                <Heading fontSize={24}>Comments ({comments.length})</Heading>
                {comments.map((comment, index) => {
                  return (
                    <React.Fragment key={comment._id}>
                      <Comment
                        body={comment.body}
                        createdAt={comment.createdAt}
                        userId={comment.userId}
                        deleteComment={() => handleDeleteComment(comment._id)}
                        _id={comment._id}
                      />
                      {index !== comments.length - 1 && <hr className="my-4" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </main>
      <Toaster />
    </>
  );
}
