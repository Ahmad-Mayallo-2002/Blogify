import { Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Blog() {
  return (
    <main className="h-[calc(100vh-152px)] center-flex">
      <VStack>
        <Heading
          as="h2"
          textAlign="center"
          fontSize={{ base: 24, md: 36 }}
          marginBottom={2}
        >
          404 This Page is Not Found
        </Heading>
        <Link href="/" className="text-greenColor hover:underline text-[24px]">
          Return To Home Page
        </Link>
      </VStack>
    </main>
  );
}
