"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Container,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { getTokenId, mainUrl } from "../assets/data";
import { useForm } from "react-hook-form";
import PostCard from "@/components/PostCard";
import { Toaster, toaster } from "@/components/ui/toaster";

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

export default function Search() {
  const [searchPosts, setSearchPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token, id } = getTokenId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>();
  const onSubmit = async (searchData: { search: string }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "search-posts", searchData);
      setSearchPosts(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
      // Remove the deleted post from the posts state
      setSearchPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main id="search" className="py-16 flex min-h-[calc(100vh-4rem-88px)]">
        <Container marginX="auto" className="grid grid-rows-[auto_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-4">
            <Field
              invalid={Boolean(errors.search?.message)}
              errorText={errors.search?.message}
            >
              <Input
                placeholder="Search Post..."
                className="px-4 border outline-0"
                {...register("search", { required: "Search is Required" })}
              />
            </Field>
            <Button
              type="submit"
              className="px-4 bg-blue-600 duration-300 hover:bg-blue-800"
            >
              Search
            </Button>
          </form>
          {loading ? (
            <VStack className="justify-center">
              <Spinner
                width={100}
                height={100}
                borderWidth={7}
                borderColor="var(--greenColor)"
                borderTopColor={"transparent"}
                animationDuration={"750ms"}
              />
              <Text className="text-greenColor">Loading...</Text>
            </VStack>
          ) : !searchPosts.length ? (
            <Heading marginBottom={0} fontSize={48} className="center-flex">
              Not Found
            </Heading>
          ) : (
            searchPosts.map((value, index) => {
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
                    id={userId}
                    userId={{ username, image: userImage, _id: userId }}
                    handleDeletePost={handleDeletePost}
                  />
                  {index !== searchPosts.length - 1 && <hr className="my-4" />}
                </React.Fragment>
              );
            })
          )}
        </Container>
      </main>
      <Toaster />
    </>
  );
}
