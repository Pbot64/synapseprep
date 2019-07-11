// Node Modules
import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
require("dotenv").config();
import configPassportModule from "./config/passport";

// import configPassport from './config/passport';

// Import Routes
import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const uri = process.env.MONGODB_URI;

// Connect to mongoDB
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
configPassportModule(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
console.log(process.env.NODE.ENV);

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
