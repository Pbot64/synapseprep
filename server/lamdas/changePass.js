// Node Modules
import express from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import passport from "passport";
import nodemailer from "nodemailer";
import Email from "email-templates";
import path from "path";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ExtractJwt } from "passport-jwt";
import mongoose from "../lib/mongoose";
// import logo from "../images/logo-email.png";

// Load Profile Model
import User from "../models/User";

// Load Input Validation
import validateChangePassInput from "../validation/change-pass";

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "pug");
app.set("views", "../");

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

// @route Get api/users/changepass
// @desc Change Password
// @access Private
app.post(
  "*",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const { errors, isValid } = validateChangePassInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Hash New Password
    const { password } = req.body;
    const { id } = req.user;
    const hashPassword = () => {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.log(err);
            resolve(hash);
          });
        });
      });
    };
    // Find and Update Password
    hashPassword()
      .then(hash => {
        User.findByIdAndUpdate(id, {
          password: hash
        }).then(user => {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: "synapseprep@gmail.com",
              pass: `${process.env.EMAIL_PASSWORD}`
            }
          });

          const email = new Email({
            transport: transporter,
            message: {
              from: "support@synapseprep.net"
              // attachments: [
              //   {
              //     filename: "logo-email.png",
              //     path: path.join(__dirname, "..", "images", "logo-email.png"),
              //     cid: "synapsePrepLogo" //same cid value as in the html img src
              //   }
              // ]
            },
            // uncomment below to send emails in development/test env:
            send: true
          });

          email
            .send({
              template: path.join(__dirname, "..", "emails"),
              message: {
                to: `${user.email}`
              },
              locals: {
                title: "Password Reset Confirmation",
                message:
                  "You are receiving this email because you (or someone else) has recently changed your Synapse Prep account's password. If you're aware, then please ignore this email.",
                subject: "Password Reset Confirmation",
                buttonText: "Get to Learning",
                buttonLink: "https://app.synapseprep.net/login"
              }
            })
            .then(email => {
              console.log(email);
              res.status(200).json({
                emailSent: true,
                hashSuccess: true,
                hashedPassword: hash
              });
            })
            .catch(console.error);
        });
      })
      .catch(err => console.log(err));
  }
);

export default app;
