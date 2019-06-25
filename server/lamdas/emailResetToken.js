// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const mongoose = require('../lib/mongoose');

// Load User model
import User from '../models/User';

// Load Input Validation
const validateResetInput = require('../validation/reset');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/users/emailRecoveryToken
// @desc Send Email with Password Reset Token
// @access Public
app.post('*', async (req, res) => {
  console.log(crypto);
  const { errors, isValid } = validateResetInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;

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
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    (user.resetPasswordExpires = Date.now() + 3600000),
      user.save(err => {
        if (err) {
          console.error(err);
        }
      });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'synapseprep@gmail.com',
        pass: `${process.env.EMAIL_PASSWORD}`
      }
    });
    const mailOptions = {
      from: 'support@synapseprep.net',
      to: `${user.email}`,
      subject: 'Link To Reset Password',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        `http://localhost:3000/resetpassword/${token}\n\n` +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    console.log('sending mail');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', response);
        res.status(200).json('recovery email sent');
      }
    });
  });
});

export default app;
