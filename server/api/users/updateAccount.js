// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import jwt from 'jsonwebtoken';

// Load User model
import User from '../../models/User';

// Load Input Validation
import validateUpdateAccountInput from '../../validation/update-account';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/users/updatePasswordViaEmail
// @desc Update Password Via Email
// @access Public
app.post('*', async (req, res) => {
  console.log('beforeUpdate', req.body);
  const { id, name, email, avatar } = req.body;
  const { errors, isValid } = validateUpdateAccountInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  await mongoose();
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
      console.log('afterUpdate', user);

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

export default app;
