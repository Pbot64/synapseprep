// Node Modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('../lib/mongoose');

// Load User model
import User from '../models/User';

// Load Input Validation
const validateLoginInput = require('../validation/login');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('../config/passport')(passport);

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
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route Get api/users/current
// @desc Return current user
// @access Private
// router.get(
//   '/current',
//   passport.authenticate('jwt', {
//     session: false
//   }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

export default app;
