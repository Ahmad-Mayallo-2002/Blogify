"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mainUrl } from "../assets/data";
import { useRouter } from "next/navigation";
import { Toaster, toaster } from "@/components/ui/toaster";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const router = useRouter();
  const onSubmit = async (userData: User) => {
    try {
      setLoading(true);
      await axios.post(mainUrl + "login", userData, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      // toaster.error({
      //   title: "Error",
      //   description: error.response.data.msg,
      //   duration: 2500,
      //   action: {
      //     label: "Close",
      //     onClick() {},
      //   },
      // });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="center-flex h-[calc(100vh-152px)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[450px] w-full md:px-0 px-6 grid gap-4"
        >
          <Field label="Email" invalid errorText={errors.email?.message}>
            <Input
              placeholder="Write Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z]{5,20}[0-9!#$%^&*]+@gmail\.com$/,
                  message: "Invalid Email Syntax",
                },
              })}
              paddingX={4}
              borderWidth="1.5px"
              outline={0}
            />
          </Field>
          <Field label="Password" invalid errorText={errors.password?.message}>
            <Input
              type="password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 9,
                  message: "Minimum Length is 9 Characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum Length is 20 Characters",
                },
              })}
              placeholder="Write Password"
              paddingX={4}
              borderWidth="1.5px"
              outline={0}
            />
          </Field>
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 h-[40px] rounded-sm hover:bg-blue-700 duration-300"
            loading={loading}
            loadingText="Loading..."
          >
            Login
          </Button>
        </form>
      </main>
      <Toaster />
    </>
  );
}
