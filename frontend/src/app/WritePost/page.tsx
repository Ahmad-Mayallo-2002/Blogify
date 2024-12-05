"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Container, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { getTokenId, mainUrl } from "../assets/data";

interface Post {
  image: string;
  title: string;
  body: string;
  category: string;
}

export default function WritePost() {
  const [categories, setCategories] = useState<string[]>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Post>();
  const handleImageChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const { token, id } = getTokenId();

  const onSubmit = async (_postData: Post, event: any) => {
    const form = new FormData(event.target);
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "add-post", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      toaster.success({
        title: "Success",
        description: data.msg,
        duration: 2500,
        type: "success",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onError = (errors: FieldErrors) => {
    for (const error in errors) {
      toaster.error({
        title: "Error",
        description: `${errors[error]?.message}`,
        duration: 2500,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    }
  };
  return (
    <>
      <main id="write-post" className="py-16">
        <Container className="mx-auto">
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            {/* Image */}
            <Field label="Image" className="h-[250px]">
              <Input
                type="file"
                id="image"
                hidden
                {...register("image", {
                  onChange: handleImageChange,
                  required: "Post Image is Required",
                })}
              />
              <label
                htmlFor="image"
                className="h-full cursor-pointer w-full bg-[#eee] rounded-md flex items-center justify-center text-gray-500"
                style={{
                  backgroundImage: imagePreview
                    ? `url(${imagePreview})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imagePreview && "Choose Image"}
              </label>
            </Field>
            {/* Title */}
            <Field label="Title">
              <Input
                placeholder="Write Post Title"
                className="border-2 py-2 px-4 outline-0"
                {...register("title", { required: "Post Title is Required" })}
              />
            </Field>
            {/* Country */}
            <Field label="Content">
              <Textarea
                className="border-2 py-2 px-4 h-[250px] resize-none outline-0"
                placeholder="Write Post Content"
                {...register("body", { required: "Post Content is Required" })}
              />
            </Field>
            {/* Category */}
            <Field label="Category">
              <select
                className="block outline-0 border-2 py-2 px-4 w-full rounded"
                {...register("category", {
                  required: "Post Category is Required",
                })}
              >
                <option value="">Select Post Category</option>
                {categories?.map(
                  (category) =>
                    category !== "all" && (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                )}
              </select>
            </Field>
            <Button
              loading={loading}
              loadingText="Loading..."
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 duration-300"
            >
              Create Post
            </Button>
          </form>
        </Container>
      </main>
      <Toaster />
    </>
  );
}
