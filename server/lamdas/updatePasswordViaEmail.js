// Node Modules
import express from 'express';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import mongoose from '../lib/mongoose';

// Load User model
import User from '../models/User';

// Load Input Validation
import validateChangePassInput from '../validation/change-pass';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/users/updatePasswordViaEmail
// @desc Update Password Via Email
// @access Public
app.put('*', async (req, res) => {
  const { errors, isValid } = validateChangePassInput(req.body);
  const BCRYPT_SALT_ROUNDS = 12;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  await mongoose();

  User.findOne({
    resetPasswordToken: req.body.resetPasswordToken
  })
    .then(user => {
      if (user == null) {
        console.error('password reset link is invalid');
        res.status(403).send('password reset link is invalid');
      } else if (user.resetPasswordExpires <= Date.now()) {
        console.error('password reset link has expired');
        res.status(403).send('password reset link has expired');
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
                  message: 'password updated'
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

export default app;
