const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const { userRouter } = require("./routes/user.js");
const { postRouter } = require("./routes/post.js");
const { commentRouter } = require("./routes/comment.js");
const cookieParser = require("cookie-parser");
require("./db.js");

config();

const app = express();
const port = process.env.PORT || 8080;
const api = "/api";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(api, userRouter);
app.use(api, postRouter);
app.use(api, commentRouter);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () =>
  console.log(`Server is Running on Port ${port} http://localhost:${port}`)
);
