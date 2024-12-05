const { hashSync, compareSync } = require("bcrypt");
const { config } = require("dotenv");
const { Router } = require("express");
const { resolve } = require("path");
const { authorization } = require("../middleware/authorization.js");
const { User } = require("../models/user.js");
const multer = require("multer");
const { writeFileSync, unlinkSync } = require("fs");
const { sign } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

config();

const upload = multer();
const router = Router();

router.use(cookieParser());

router.post("/sign-up", upload.single("image"), async (req, res) => {
  try {
    const { email, password, username, country, birthDate } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail)
      return res.status(400).json({ msg: "This Email is Already Exist" });
    const newUser = new User({
      username: username,
      email: email,
      password: hashSync(password, 10),
      country: country,
      birthDate: birthDate,
    });
    if (req.file) {
      const fileNameArray = req.file.originalname.split(".");
      const fileName =
        fileNameArray[0] + "-" + Date.now() + "." + fileNameArray[1];
      newUser.image = fileName;
      writeFileSync(
        resolve(`../../Blogify/frontend/public/users_images/${fileName}`),
        req.file.buffer
      );
    }
    await newUser.save();
    return res.status(201).json({ msg: "Sign Up is Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email: email });
    const checkPassword = compareSync(password, checkEmail.password);
    if (!checkEmail) return res.status(404).json({ msg: "Invalid Email" });
    if (!checkPassword)
      return res.status(404).json({ msg: "Invalid Password" });
    const token = sign(
      { _id: checkEmail._id, role: checkEmail.role, email: email },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
    const userData = JSON.stringify({
      token: token,
      id: checkEmail._id,
    });
    res
      .cookie("userData", userData, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ msg: "Correct" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-users", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    const users = await User.find();
    const length = await User.countDocuments({ role: "user" });
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "Your Are Not Admin" });
    if (!users.length)
      return res.status(404).json({ msg: "No Users Are Found" });
    return res.status(200).json({
      users: users,
      length: length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.get("/get-users/:id", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id).select([
      "-password",
      ,
      "-birthDate",
    ]);
    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.delete("/delete-user/:id", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    await User.findByIdAndDelete(req.headers.id);
    return res.status(200).json({ msg: "User is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(process.env.SERVER_ERROR);
  }
});

router.patch(
  "/update-user/:id",
  upload.single("image"),
  authorization,
  async (req, res) => {
    try {
      const { username, email, country } = req.body;
      const currentUser = await User.findById(req.headers.id);
      let requestBody = {};
      if (!currentUser)
        return res.status(404).json({ msg: "This User is Not Found" });
      if (username) requestBody.username = username;
      if (email) {
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail)
          return res.status(400).json({ msg: "This Email is Already Exist" });
        requestBody.email = email;
      }
      if (country) requestBody.country = country;
      if (req.file) {
        const fileNameArray = req.file.originalname.split(".");
        const fileName =
          fileNameArray[0] + "-" + Date.now() + "." + fileNameArray[1];
        const filePath = resolve(
          "../../Blogify/frontend/public/users_images/" + fileName
        );
        requestBody.image = fileName;
        writeFileSync(filePath, req.file.buffer);
        unlinkSync(
          resolve("../../Blogify/frontend/public/users_images/") +
            currentUser.image
        );
      }
      await User.findByIdAndUpdate(req.headers.id, { $set: requestBody });
      return res.status(200).json({ msg: "User Data is Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json(process.env.SERVER_ERROR);
    }
  }
);

module.exports.userRouter = router;
