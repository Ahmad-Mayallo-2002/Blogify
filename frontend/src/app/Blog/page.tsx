"use client";
import { Container, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { getTokenId, mainUrl } from "../assets/data";
import { Toaster, toaster } from "@/components/ui/toaster";
import PostCard from "@/components/PostCard";

interface Post {
  _id: string;
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
}

export default function Blog() {
  const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { id: currentUserId, token } = getTokenId();
  const getData = async () => {
    try {
      setLoading(true);
      const { data: categories } = await axios.get(
        "http://localhost:3000/api/categories"
      );
      const { data: posts } = await axios.get(
        mainUrl + "get-posts?category=" + activeCategory
      );
      setCategories(categories);
      setPosts(posts);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [activeCategory]);
  const handleDeletePost = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + "delete-post/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      toaster.success({
        title: "Success",
        description: data.msg,
        duration: 2500,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="py-16">
        <Container>
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
          ) : (
            <>
              <div className="flex gap-4 flex-wrap justify-center mb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    value={category}
                    className={`px-4 capitalize border-2 border-greenColor duration-300 ${
                      activeCategory === category
                        ? "bg-greenColor text-white"
                        : "text-greenColor hover:bg-greenColor hover:text-white"
                    }`}
                    onClick={(event) => {
                      setActiveCategory(event.currentTarget.value);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="grid gap-4 all-posts">
                {!posts.length ? (
                  <Heading className="mb-0 text-center text-[48px] center-flex min-h-[calc(100vh-4rem-328px)]">
                    No Posts
                  </Heading>
                ) : (
                  posts.map((value, index) => {
                    const {
                      _id,
                      title,
                      image,
                      body,
                      createdAt,
                      category,
                      userId: { username, image: userImage, _id: userId },
                    } = value;

                    return (
                      <React.Fragment key={_id}>
                        <PostCard
                          _id={_id}
                          title={title}
                          body={body}
                          image={image}
                          category={category}
                          createdAt={createdAt}
                          id={currentUserId}
                          userId={{ username, image: userImage, _id: userId }}
                          handleDeletePost={handleDeletePost}
                        />
                        {index !== posts.length - 1 && <hr />}
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </>
          )}
        </Container>
      </main>
      <Toaster />
    </>
  );
}
