const { config } = require("dotenv");
const { Router } = require("express");
const { authorization } = require("../middleware/authorization.js");
const { Post } = require("../models/post.js");
const { User } = require("../models/user.js");
const { Comment } = require("../models/comment.js");
const { writeFileSync, unlinkSync, stat } = require("fs");
const { resolve } = require("path");
const multer = require("multer");

config();

const serverError = process.env.SERVER_ERROR || "Internal Server Error";

const upload = multer();

const router = Router();

router.post(
  "/add-post",
  upload.single("image"),
  authorization,
  async (req, res) => {
    try {
      const { title, body, category } = req.body;
      const newPost = new Post({
        title: title,
        body: body,
        category: category,
        userId: req.headers.id,
      });
      if (req.file) {
        const fileNameArray = req.file.originalname.split(".");
        const fileName =
          fileNameArray[0] + "-" + Date.now() + "." + fileNameArray[1];
        newPost.image = fileName;
        console.log(fileName);
        console.log(fileNameArray);

        writeFileSync(
          resolve(`../../Blogify-master/frontend/public/posts_images/${fileName}`),
          req.file.buffer
        );
      }
      await newPost.save();
      return res.status(201).json({ msg: "New Post is Written" });
    } catch (error) {
      console.log(error);
      res.status(500).json(serverError);
    }
  }
);

router.delete("/delete-post/:id", authorization, async (req, res) => {
  try {
    const postId = req.params.id;
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return res.status(404).json({ msg: "This Post is Not Found" });
    await Post.findByIdAndDelete(postId);
    unlinkSync(
      resolve(`../../Blogify/frontend/public/posts_images/${currentPost.image}`)
    );
    await Comment.deleteMany({ postId: postId });
    return res.status(200).json({ msg: "This Post is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.get("/get-posts", async (req, res) => {
  try {
    const category = req.query.category;
    let posts;
    if (!category || category === "all") {
      posts = await Post.find({}).populate({
        path: "userId",
        select: ["username", "image"],
      });
    } else {
      posts = await Post.find({ category: category }).populate({
        path: "userId",
        select: ["username", "image"],
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.get("/get-posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: "userId",
      select: ["username", "image"],
    });
    if (!post) return res.status(404).json({ msg: "This Post is Not Found" });
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.patch("/update-post/:id", authorization, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    let requestBody = {};
    const currentPost = await Post.findById(req.params.id);
    const fileNameArray = req.file.originalname.split(".");
    const fileName =
      fileNameArray[0] + "-" + Date.now() + "." + fileNameArray[1];
    if (!currentPost)
      return res.status(404).json({ msg: "This Post is Not Found" });
    if (title) requestBody.title = title;
    if (body) requestBody.body = body;
    if (category) requestBody.category = category;
    if (req.file) {
      unlinkSync(
        resolve(
          `../../Blogify/frontend/public/users_images/${currentPost.image}`
        )
      );
      requestBody.image = fileName;
      writeFileSync(
        resolve(`../../Blogify/frontend/public/posts_images/${fileName}`),
        req.file.buffer
      );
    }
    await Post.findByIdAndUpdate(req.params.id, { $set: requestBody });
    return res.status(201).json({ msg: "Post is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.patch("/like/:postId", authorization, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.headers.id;

    const currentUser = await User.findById(userId);
    const currentPost = await Post.findById(postId);

    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    if (!currentPost)
      return res.status(404).json({ msg: "This Post is Not Found" });

    if (currentPost.likes.includes(userId)) {
      currentPost.likes.pull(userId);
      await currentPost.save();
      return res.status(201).json({ msg: "Remove Like Success" });
    }

    if (
      currentPost.disLikes.includes(userId) ||
      !currentPost.disLikes.includes(userId)
    ) {
      currentPost.disLikes.pull(userId);
      currentPost.likes.push(userId);

      await currentPost.save();
      return res
        .status(201)
        .json({ msg: "Remove Dislike Success And Add Like Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.patch("/dislike/:postId", authorization, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.headers.id;

    const currentUser = await User.findById(userId);
    const currentPost = await Post.findById(postId);

    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    if (!currentPost)
      return res.status(404).json({ msg: "This Post is Not Found" });

    if (currentPost.disLikes.includes(userId)) {
      currentPost.disLikes.pull(userId);
      await currentPost.save();
      return res.status(201).json({ msg: "Remove Dislike Success" });
    }

    if (
      currentPost.likes.includes(userId) ||
      !currentPost.likes.includes(userId)
    ) {
      currentPost.disLikes.push(userId);
      currentPost.likes.pull(userId);
      await currentPost.save();
      return res
        .status(201)
        .json({ msg: "Remove Like Success And Add Dislike Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.post("/search-posts", async (req, res) => {
  try {
    const { search } = req.body;
    const regExp = new RegExp(search);
    const posts = await Post.find({
      $or: [
        {
          category: { $regex: regExp, $options: "i" },
        },
        {
          title: { $regex: regExp, $options: "i" },
        },
        {
          body: { $regex: regExp, $options: "i" },
        },
      ],
    }).populate({
      path: "userId",
      select: ["username", "image"],
    });
    if (!posts.length) return res.status(404).json({ msg: "No Posts Found" });
    return res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

module.exports.postRouter = router;
