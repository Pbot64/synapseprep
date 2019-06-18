// Node Modules
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('../lib/mongoose');

// Load User model
import User from '../models/User';

// Load Input Validation
const validateChangePassInput = require('../validation/change-pass');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('../config/passport')(passport);

// @route Get api/users/changepass
// @desc Change Password
// @access Private
app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { errors, isValid } = validateChangePassInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    await mongoose();

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
    hashPassword().then(hash => {
      User.findByIdAndUpdate(id, {
        password: hash
      }).then(user => {
        console.log(user);
      });
      res.json({
        success: true,
        hashedPassword: hash
      });
    });
  }
);

export default app;
