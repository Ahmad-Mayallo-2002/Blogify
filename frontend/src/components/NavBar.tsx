"use client";
import { navLinks } from "@/app/assets/data";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { ColorModeButton } from "./ui/color-mode";
import { FaBlog } from "react-icons/fa";
import { Container, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserList from "./UserList";
import Cookies from "universal-cookie";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(false);
  const pathname = usePathname();
  const cookies = new Cookies();
  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <nav
      className={`bg-gray-100 dark:bg-gray-800 p-4 shadow-md dark:shadow-[0px_5px_15px_4px_rgba(255,255,255,0.35)]
`}
    >
      <Container className="flex justify-between items-center">
        {/* Brand Title */}
        <Heading className="lg:text-3xl text-2xl my-0 font-bold text-gray-800 dark:text-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <FaBlog />
            Blogify
          </Link>
        </Heading>

        {/* Toggle Menu Icon */}
        <div
          className="lg:hidden text-gray-800 dark:text-gray-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={24} />
        </div>
        {/* Links */}
        <ul
          className={`z-50 absolute duration-300 lg:static top-16 left-0 w-full lg:w-auto bg-gray-100 dark:bg-gray-800 lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-6 px-4 py-6 lg:py-0 transform ${
            isOpen ? "block" : "hidden"
          } lg:block transition-transform`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`font-bold text-gray-800 dark:text-gray-200 hover:text-greenColor dark:hover:text-greenColor duration-200 ${
                  pathname === link.path &&
                  "text-greenColor dark:text-greenColor"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="flex lg:hidden flex-col w-fit gap-4">
            {client && cookies.get("userData") ? (
              <UserList />
            ) : (
              <>
                <Link
                  href="/Login"
                  className="bg-[#E2E4E8] text-black font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  href="/SignUp"
                  className="bg-greenColor text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
            <ColorModeButton
              bgColor="red.500"
              padding=".5rem 1rem !important"
              color="#fff"
              id="chakra-button"
              className="!h-[40px]"
            />
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {client && cookies.get("userData") ? (
            <UserList />
          ) : (
            <>
              <Link
                href="/Login"
                className="bg-[#E2E4E8] text-black font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link
                href="/SignUp"
                className="bg-greenColor text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
          <ColorModeButton bgColor="red.500" color="#fff" />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
