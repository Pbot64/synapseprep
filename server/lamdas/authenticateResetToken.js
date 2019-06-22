// Node Modules
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../lib/mongoose');

// Load User model
import User from '../models/User';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/users/authenticateResetToken
// @desc Authenticate password reset link
// @access Public
app.get('*', async (req, res) => {
  console.log(req.query.resetPasswordToken);

  await mongoose();
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken
  })
    .then(user => {
      if (user == null) {
        console.error('password reset link is invalid');
        res.status(403).send('password reset link is invalid');
      } else if (user.resetPasswordExpires.getTime() <= Date.now()) {
        console.error('password reset link has expired');
        res.status(403).send('password reset link has expired');
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok'
        });
      }
    })
    .catch(err => console.log(err));
});

export default app;
