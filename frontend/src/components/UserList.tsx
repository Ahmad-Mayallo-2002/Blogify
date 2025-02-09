"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "./ui/menu";
import axios from "axios";
import { getTokenId, mainUrl } from "@/app/assets/data";
import Cookies from "universal-cookie";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

interface User {
  username: string;
  email: string;
  country: string;
  image: string;
}

export default function UserList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const cookies = new Cookies();
  const { token, id } = getTokenId();

  const getData = async (id: string, token: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(mainUrl + "get-users/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      });
      setUser(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData(id, token);
  }, [id, token]);

  return loading ? (
    <Spinner
      borderColor="var(--greenColor)"
      className="border-[3px] border-greenColor !border-t-transparent"
      animationDuration="750ms"
      width={50}
      height={50}
    />
  ) : (
    <MenuRoot open={open} closeOnSelect={true} size="md">
      <MenuTrigger asChild outline={0}>
        <Button onClick={() => isOpen((prev) => !prev)}>
          {user?.image && (
            <Image
              src={
                /https/.test(user?.image)
                  ? user?.image
                  : `/users_images/${user?.image}`
              }
              className="w-[50px] h-[50px] rounded-full"
              alt="User Image"
              width={50}
              height={50}
            />
          )}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="Username">Username: {user?.username}</MenuItem>
        <MenuItem value="Email">Email: {user?.email}</MenuItem>
        <MenuItem value="Country">Country: {user?.country}</MenuItem>
        <MenuSeparator />
        <MenuItem
          value="dfg"
          cursor="pointer"
          outline={0}
          onClick={() => cookies.remove("userData")}
        >
          <Link href="/Login" className="block w-full outline-0">
            Logout
          </Link>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
