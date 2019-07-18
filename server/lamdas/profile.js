import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ExtractJwt } from "passport-jwt";
import mongoose from "../lib/mongoose";

// Load Profile Model
import User from "../models/User";
import Profile from "../models/Profile";

// import configPassportModule from "../config/passport";

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("hello1");

// Passport middleware
app.use(passport.initialize());

// Passport config
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    await mongoose();
    console.log(jwt_payload);
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          console.log(user);
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

// @route Get api/profile
// @desc Gets current user profile
// @access Private
app.get(
  "*",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    console.log("req.body", req.body);
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        console.log("profile response area");
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        console.log("profile found");
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

export default app;
