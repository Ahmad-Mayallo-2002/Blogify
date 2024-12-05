"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster, Toaster } from "@/components/ui/toaster";
import { createToaster, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mainUrl } from "../assets/data";
import { FaX } from "react-icons/fa6";

interface User {
  username: string;
  email: string;
  password: string;
  image: string;
  country: string;
  birthDate: string;
}

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<{ country: string }[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [imageSrc, setImageSrc] = useState<string>(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );

  const handleImageChange = (event: ChangeEvent) => {
    const file = event.target as HTMLInputElement;
    if (file.files) setImageSrc(URL.createObjectURL(file.files[0]));
  };
  const onSubmit = async (userData: User, event: any) => {
    try {
      const form = new FormData(event.target);
      setLoading(true);
      const { data } = await axios.post(mainUrl + "sign-up", form);
      toaster.create({
        title: "Success",
        description: data.msg,
        duration: 3000,
        type: "success",
        action: {
          label: `X`,
          onClick: function (): void {},
        },
      });
    } catch (error: any) {
      setLoading(false);
      toaster.create({
        title: "Error",
        description: error.response.data.msg,
        duration: 3000,
        type: "error",
        action: {
          label: `X`,
          onClick: function (): void {},
        },
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/countries");
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <main className="center-flex py-4 min-h-[calc(100vh-152px)]">
        <form
          className="max-w-[450px] w-full md:px-0 px-6 grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Image */}
          <Field>
            <Input
              {...register("image", { onChange: handleImageChange })}
              type="file"
              hidden
              id="image"
            />
            <label htmlFor="image" className="inline mx-auto">
              <img
                src={imageSrc}
                alt="User Image"
                className="rounded-full w-[100px] h-[100px] cursor-pointer"
              />
            </label>
          </Field>
          {/* Username */}
          <Field label="Username" invalid errorText={errors.username?.message}>
            <Input
              placeholder="Write Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Minimum Length is 5 Characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum Length is 20 Characters",
                },
              })}
              paddingX={4}
              borderWidth="1.5px"
              outline={0}
            />
          </Field>
          {/* Email */}
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
          {/* Password */}
          <Field label="Password" invalid errorText={errors.password?.message}>
            <Input
              placeholder="Write Password"
              paddingX={4}
              type="password"
              borderWidth="1.5px"
              outline={0}
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
            />
          </Field>
          {/* Country */}
          <div className="grid gap-1">
            <label htmlFor="county">Country</label>
            <select
              id="country"
              aria-placeholder="asdasdasd"
              className="h-[40px] px-4 outline-0 border bg-transparent rounded-md"
              {...register("country", { required: "Country is Required" })}
            >
              <option value="">Select Your Country</option>
              {countries.map((value) => (
                <option
                  className="dark:text-black"
                  key={value.country}
                  value={value.country}
                >
                  {value.country}
                </option>
              ))}
            </select>
            {errors.country?.message && (
              <span className="text-[#f87171]">{errors.country?.message}</span>
            )}
          </div>
          {/* Date Birth */}
          <Field
            label="Birth Date"
            invalid
            errorText={errors.birthDate?.message}
          >
            <Input
              type="date"
              className="border px-4"
              {...register("birthDate", { required: "Birth Date is Required" })}
            />
          </Field>
          <Button
            type="submit"
            loading={loading}
            loadingText="Loading..."
            className="bg-blue-600 text-white px-4 h-[40px] rounded-sm hover:bg-blue-700 duration-300"
          >
            Sign Up
          </Button>
        </form>
      </main>
      <Toaster />
    </>
  );
}
