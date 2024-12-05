import { IconType } from "react-icons";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaMobile,
  FaNetworkWired,
  FaLaptopCode,
  FaRobot,
} from "react-icons/fa";
import Cookies from "universal-cookie";

interface navLink {
  name: string;
  path: string;
}

interface IconTitle {
  title: string;
  icon: IconType;
}

interface technicalPost {
  title: string;
  desc: string;
}

interface topPost {
  title: string;
  desc: string;
}

interface socialLink {
  icon: IconType;
  path: string;
}

const navLinks: navLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Contact Us", path: "/Contact" },
  { name: "Blog Posts", path: "/Blog" },
  { name: "Search", path: "/Search" },
  { name: "Write Post", path: "/WritePost" },
];

const topPosts: topPost[] = [
  {
    title: "Featured Bloggers",
    desc: "Alice, Bob, Charlie",
  },
  {
    title: "Inspirational Stories",
    desc: "Motivational Content Hub",
  },
  {
    title: "Laugh Out Loud Blogs",
    desc: "Humor & Entertainment Corner",
  },
  {
    title: "Deep Dive into Topics",
    desc: "In-depth Analysis & Insights",
  },
  {
    title: "Meet the Creators",
    desc: "Blogify Team, Founders",
  },
];

const categories: string[] = [
  "all",
  "travel",
  "food",
  "fashion",
  "health",
  "technology",
  "business",
  "lifestyle",
  "education",
  "inspiration",
  "entertainment",
  "sports",
  "culture",
  "science",
  "history",
  "movies & TV",
  "true stories",
  "design",
];

const socialLinks: socialLink[] = [
  {
    icon: FaFacebook,
    path: "https://www.facebook.com",
  },
  {
    icon: FaTwitter,
    path: "https://www.twitter.com",
  },
  {
    icon: FaLinkedin,
    path: "https://www.linkedin.com/in/ahmad-mayallo-86944b21b/",
  },
  {
    icon: FaGithub,
    path: "https://github.com/Ahmad-Mayallo-2002",
  },
];

const technicalPosts: technicalPost[] = [
  {
    title: "The Future of AI in Everyday Life",
    desc: "Explore how artificial intelligence is transforming daily activities and enhancing human capabilities.",
  },
  {
    title: "Smart Cities: The Rise of Urban Tech",
    desc: "Discover how technology is reshaping urban environments around the globe.",
  },
  {
    title: "Virtual Reality: Beyond Gaming",
    desc: "Learn how virtual reality is expanding its horizons beyond entertainment.",
  },
];

const iconsWithTitles: IconTitle[] = [
  { icon: FaLaptopCode, title: "Laptop Code" },
  { icon: FaMobile, title: "Mobile Development" },
  { icon: FaNetworkWired, title: "Networking" },
  { icon: FaRobot, title: "Artificial Intelligence" },
];

const defaultUserImage: string =
  "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

const mainUrl: string = "http://localhost:5000/api/";

const getTokenId = (): { token: string; id: string } => {
  const cookies = new Cookies();
  return cookies.get("userData") || { token: "", id: "" };
};

export {
  navLinks,
  topPosts,
  categories,
  socialLinks,
  technicalPosts,
  defaultUserImage,
  mainUrl,
  getTokenId,
  iconsWithTitles,
};
