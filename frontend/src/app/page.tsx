import { Button } from "@/components/ui/button";
import {
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  categories,
  iconsWithTitles,
  technicalPosts,
  topPosts,
} from "./assets/data";
import { FaCheck, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  const { Root, Header, Body, Footer: Foot } = Card;
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="py-16">
        <Container>
          <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <GridItem className="flex justify-center flex-col">
              <Heading marginTop={0} as="h2" fontSize={36}>
                Explore &amp; Enjoy Blogs on{" "}
                <span className="block md:inline">Various Topics</span>
              </Heading>
              <p>Start Reading Now!</p>
              <Button
                width="fit-content"
                bg="var(--greenColor)"
                _hover={{ bg: "var(--hoverGreenColor)" }}
                padding="1.25rem 3rem"
                color="white"
              >
                Read Blogs
              </Button>
            </GridItem>
            <GridItem>
              <img
                src={"/hero-img.png"}
                width={100}
                height={100}
                className="w-full h-[400px]"
                alt="Landing Image"
              />
            </GridItem>
          </Grid>
        </Container>
      </section>
      {/* Discover Top */}
      <section id="discover-top" className="py-16">
        <Container>
          <Heading fontSize={30}>Discover Top Blog Posts</Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(5, 1fr)",
            }}
            gap={4}
          >
            {topPosts.map((post, index) => (
              <GridItem key={index}>
                <img
                  src={`/top-${index + 1}.png`}
                  className="w-full mb-4 h-[150px] rounded-md"
                />
                <Heading fontSize={20} className="mb-2">
                  {post.title}
                </Heading>
                <p className="text-md">{post.desc}</p>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </section>
      {/* Categories */}
      <section id="categories" className="py-16">
        <Container>
          <Heading className="text-center text-4xl">Blog Categories</Heading>
          <ul
            id="categories"
            className="flex justify-center flex-wrap gap-4 text-gray-200"
          >
            {categories.map((category, index) => (
              <li
                key={index}
                className="capitalize px-4 py-2 rounded-md shadow-md transition-colors"
              >
                {category}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      {/* Membership */}
      <section id="membership" className="py-16">
        <Container>
          <Heading textAlign="center" fontSize={36}>
            Choose Your Membership
          </Heading>
          <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <GridItem className="md:px-20">
              <span>Basic</span>
              <Heading fontSize={25}>FREE</Heading>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <span className="bg-[#aaa] text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>
                  Access to 10 posts
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-[#aaa] text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>
                  5 downloads monthly
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-[#aaa] text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>
                  7 days trial period
                </li>
              </ul>
              <Button
                bg="#eee"
                width="100%"
                _dark={{ color: "black" }}
                fontWeight="bold"
                marginTop={4}
              >
                Start For Free
              </Button>
            </GridItem>
            <GridItem className="md:px-20">
              <span>Pro</span>
              <Heading fontSize={25}>$60/month</Heading>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <span className="bg-greenColor text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>{" "}
                  Unlimited access to all posts
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-greenColor text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>
                  Unlimited downloads per month
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-greenColor text-white block w-[22px] h-[22px] center-flex">
                    <FaCheck />
                  </span>{" "}
                  7 days trial period
                </li>
              </ul>
              <Button
                bg="var(--greenColor)"
                _hover={{ bg: "var(--hoverGreenColor)" }}
                color="white"
                fontWeight="bold"
                marginTop={4}
                width="100%"
              >
                Start Pro Membership
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </section>
      {/* Technical Blog */}
      <div id="technical-blog" className="py-16">
        <Container>
          <Heading textAlign="center" fontSize={36}>
            Technical Blog Posts
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
            marginBottom={3}
          >
            {technicalPosts.map((post, index) => (
              <GridItem key={index}>
                <img
                  src={`/feature-${index + 1}.png`}
                  alt="Image"
                  className="w-full h-[200px] mb-3"
                />
                <Heading fontSize={20}>{post.title}</Heading>
                <Text>{post.desc}</Text>
              </GridItem>
            ))}
          </Grid>
          <Heading textAlign="center" fontSize={30}>
            Categories
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {iconsWithTitles.map((Value, index) => (
              <GridItem key={index} className="flex flex-col items-center">
                <Value.icon className="text-greenColor text-[70px]" />
                <Heading className="mt-4 mb-0 text-[24px] text-center">
                  {Value.title}
                </Heading>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </div>
      {/* Team */}
      <section id="team" className="py-16">
        <Container>
          <Heading textAlign="center" fontSize={36}>
            Team
          </Heading>
          <Root width="fit-content" margin="auto">
            <img
              src="/me.jpg"
              className="w-[250px] h-[300px] rounded-t-lg"
              alt="My Image"
            />
            <Header
              as="h3"
              fontSize={24}
              fontWeight="bold"
              marginBottom={0}
              textAlign="center"
              padding="1rem 1rem 0"
            >
              Ahmad Mayallo
            </Header>
            <Body textAlign="center" padding="1rem">
              Software Developer
            </Body>
            <Foot
              className="flex items-center justify-evenly"
              padding="0 1rem 1rem"
            >
              <Link href="https://github.com/Ahmad-Mayallo-2002">
                <FaGithub className="text-4xl hover:text-greenColor duration-300" />
              </Link>
              <Link href="https://www.linkedin.com/in/ahmad-mayallo-86944b21b/">
                <FaLinkedin className="text-4xl hover:text-greenColor duration-300" />
              </Link>
            </Foot>
          </Root>
        </Container>
      </section>
    </>
  );
}
