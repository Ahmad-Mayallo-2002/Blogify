"use client";
import { socialLinks } from "@/app/assets/data";
import { Container } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 border-t-2">
      <Container className="flex md:justify-between md:flex-row flex-col gap-y-4 justify-center items-center">
        <p className="m-0 md:text-start text-center">
          Copyrights are Reserved Made in 2024 By Ahmad Mayallo
        </p>
        <ul className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>
                <link.icon className="text-greenColor text-3xl" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
