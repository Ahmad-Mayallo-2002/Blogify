"use client";
import { Spinner, Text, VStack } from "@chakra-ui/react";

export default function BlogPosts() {
  return (
    <main className="h-[calc(100vh-152px)] center-flex">
      <VStack>
        <Spinner
          size="xl"
          borderColor="var(--greenColor)"
          className="border-[10px] border-greenColor !border-t-transparent"
          animationDuration="750ms"
          width={100}
          height={100}
        />
        <Text color="var(--greenColor)" fontSize={30}>
          Loading...
        </Text>
      </VStack>
    </main>
  );
}
