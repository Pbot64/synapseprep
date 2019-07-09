// Load User Model
import User from "../../models/User";

// Node Modules
import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import nodemailer from "nodemailer";
import crypto from "crypto";
import Email from "email-templates";
import path from "path";

// Load Input Validation
import validateRegisterInput from "../../validation/register";
import validateLoginInput from "../../validation/login";
import validateChangePassInput from "../../validation/change-pass";
import validateResetInput from "../../validation/reset";
import validateUpdateAccountInput from "../../validation/update-account";

const router = express.Router();

// @route Get api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users Works"
  })
);

// @route Get api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
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
              },
              // uncomment below to send emails in development/test env:
              send: true
            });

            email
              .send({
                template: path.join(__dirname, "..", "..", "emails"),
                message: {
                  to: `${user.email}`
                },
                locals: {
                  title: "Welcome to Synapse Prep!",
                  message:
                    "We're super excited to work with you/your kiddo to surpass your academic goals. \n\n" +
                    "If that's the SAT then we invite you/your child to start working through our online SAT prep course for free! If you're looking for help with we'll connect you with one of our incredible personal tutors.",
                  subject: `Hey ${user.name
                    .split(" ")
                    .slice(0, -1)
                    .join(" ")}, Welcome to Synapse Prep!`,
                  buttonText: "Get to Learning",
                  buttonLink: "http://localhost:3000/login"
                }
              })
              .then(res.status(200).json("email sent"))
              .catch(console.error);
          })
          .catch(err => console.log(err));
      });
    });
  });
});

// @route Get api/users/login
// @desc Login User / Returning JWT TOken
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched then Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        // Sign Token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          {
            expiresIn: 36000
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route Get api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route Get api/users/changepass
// @desc Change Password
// @access Private
router.post(
  "/changePass",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateChangePassInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Hash New Password
    const { password } = req.body;
    const { id } = req.user;
    const hashPassword = () => {
      return new Promise((res, rej) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.log(err);
            res(hash);
          });
        });
      });
    };
    // Find and Update Password
    hashPassword()
      .then(hash => {
        User.findByIdAndUpdate(id, {
          password: hash
        })
          .then(user => {
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
              },
              // uncomment below to send emails in development/test env:
              send: true
            });

            email
              .send({
                template: path.join(__dirname, "..", "..", "emails"),
                message: {
                  to: `${user.email}`
                },
                locals: {
                  title: "Password Reset Confirmation",
                  message:
                    "You are receiving this email because you (or someone else) has recently changed your Synapse Prep account's password. If you're aware, then please ignore this email.",
                  subject: "Password Reset Confirmation",
                  buttonText: "Get to Learning",
                  buttonLink: "http://localhost:3000/login"
                }
              })
              .then(() => {
                res.status(200).json({
                  emailSent: true,
                  hashSuccess: true,
                  hashedPassword: hash
                });
              })
              .catch(console.error);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

// @route Get api/users/emailRecoveryToken
// @desc Send Email with Password Reset Token
// @access Public
router.post("/emailResetToken", (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;

  // Find user by email
  User.findOne({
    email
  })
    .then(user => {
      console.log(user);
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      (user.resetPasswordExpires = Date.now() + 3600000),
        user.save(err => {
          if (err) {
            console.error(err);
            console.log("thoughtso");
          }
        });

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
        },
        // uncomment below to send emails in development/test env:
        send: true
      });

      email
        .send({
          template: path.join(__dirname, "..", "..", "emails"),
          message: {
            to: `${user.email}`
          },
          locals: {
            title: "Password Reset Request",
            message:
              "We just got a request to reset your password.\n\n" +
              "Please click the button below, or paste this url into your browser to complete the process:\n\n" +
              `https://app.synapseprep.net/resetpassword/${token}`,
            buttonText: "Reset Password",
            buttonLink: `http://localhost:3000/resetpassword/${token}`,
            subject: "Synapse Prep Password Reset Request"
          }
        })
        .then(() => {
          res.status(200).json({
            emailSent: true
          });
        })
        .catch(console.error);
    })
    .catch(err => console.log(err));
});

// @route Get api/users/authenticateResetToken
// @desc Authenticate password reset link
// @access Public
router.get("/authenticateResetToken", (req, res) => {
  console.log(req.query.resetPasswordToken);

  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken
  })
    .then(user => {
      if (user == null) {
        console.error("password reset link is invalid");
        res.status(403).send("password reset link is invalid");
      } else if (user.resetPasswordExpires.getTime() <= Date.now()) {
        console.error("password reset link has expired");
        res.status(403).send("password reset link has expired");
      } else {
        res.status(200).send({
          username: user.username,
          message: "password reset link a-ok"
        });
      }
    })
    .catch(err => console.log(err));
});

// @route Get api/users/resetpassword
// @desc Update Password Via Email
// @access Public
router.put("/updatePasswordViaEmail", (req, res) => {
  const { errors, isValid } = validateChangePassInput(req.body);
  const BCRYPT_SALT_ROUNDS = 12;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    resetPasswordToken: req.body.resetPasswordToken
  })
    .then(user => {
      if (user == null) {
        console.error("password reset link is invalid");
        res.status(403).send("password reset link is invalid");
      } else if (user.resetPasswordExpires <= Date.now()) {
        console.error("password reset link has expired");
        res.status(403).send("password reset link has expired");
      } else {
        bcrypt
          .hash(req.body.password, BCRYPT_SALT_ROUNDS)
          .then(hashedPassword => {
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            user
              .save(err => {
                if (err) {
                  console.error(err);
                }
                res.status(200).send({
                  message: "password updated"
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.post(
  "/auth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  function(req, res) {
    // Create JWT payload with user info, sign JWT, and send to client.
  }
);

// router.get(
//   "/auth/facebook",
//   passport.authorize("facebook", {
//     session: false
//   })
// );

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { session: false })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  }),
  function(req, res) {
    console.log("hell world!");
    console.log(req.user);
    console.log(user);

    // // User Matched then Create JWT payload
    // const payload = {
    //   id: req.user.id,
    //   name: req.user.name,
    //   avatar: req.user.avatar
    // };

    // jwt.sign(
    //   payload,
    //   process.env.SECRET_OR_KEY,
    //   {
    //     expiresIn: 36000
    //   },
    //   (err, token) => {
    //     res.json({
    //       success: true,
    //       token: `Bearer ${token}`
    //     });
    //   }
    // );
  }
);

// @route Get api/users/updateAccount
// @desc Update Password Via Email
// @access Public
router.post("/updateAccount", (req, res) => {
  console.log("beforeUpdate", req.body);
  const { id, name, email, avatar } = req.body;
  const { errors, isValid } = validateUpdateAccountInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      avatar
    },
    { new: true }
  )
    .then(user => {
      console.log("afterUpdate", user);

      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email
      };
      // Sign Token
      jwt.sign(
        payload,
        process.env.SECRET_OR_KEY,
        {
          expiresIn: 36000
        },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      );
    })
    .catch(err => console.log(err));
});

export default router;
