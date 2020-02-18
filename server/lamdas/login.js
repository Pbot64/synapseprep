// Node Modules
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import passport from 'passport';

import mongoose from '../lib/mongoose';

// Load User model
import User from '../models/User';

import configPassportModule from '../config/passport';

// Load Input Validation
import validateLoginInput from '../validation/login';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
configPassportModule(passport);

// @route Post api/users/login
// @desc Login User / Returning JWT TOken
// @access Public
app.post('*', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;

  await mongoose();

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    console.log(user);
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched then Create JWT payload
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
            expiresIn: 259200
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

export default app;
