const { config } = require("dotenv");
const { Router } = require("express");
const { authorization } = require("../middleware/authorization");
const { Comment } = require("../models/comment");

config();
const serverError = process.env.SERVER_ERROR || "Internal Server Error";
const router = Router();

router.post("/add-comment/:postId", authorization, async (req, res) => {
  try {
    const newComment = new Comment({
      body: req.body.body,
      postId: req.params.postId,
      userId: req.headers.id,
    });
    await newComment.save();
    return res.status(201).json({ msg: "New Comment is Written" });
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.get("/get-comments/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .select("-postId")
      .populate({
        path: "userId",
        select: ["username", "image"],
      });
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.delete("/delete-comment/:id", authorization, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Comment is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

router.patch("/update-comment/:commentId", authorization, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $set: { body: req.body.body },
    });
    return res.status(200).json({ msg: "Comment is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError);
  }
});

module.exports.commentRouter = router;
