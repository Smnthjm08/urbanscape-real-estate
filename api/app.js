import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.routes.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 8800;
app.listen(8800, () => {
  console.log(`Server is running on port ${port}`);
});
