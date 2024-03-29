// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import mongoose from '../lib/mongoose';
import Email from 'email-templates';
import path from 'path';

// Load User model
import User from '../models/User';

// Load Input Validation
import validateResetInput from '../validation/reset';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine setup
app.set('view engine', 'pug');
app.set('views', '../');

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
  })
    .then(user => {
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

      const email = new Email({
        transport: transporter,
        message: {
          from: 'support@synapseprep.net'
        },
        // uncomment below to send emails in development/test env:
        send: true
      });

      email
        .send({
          template: path.join(__dirname, '..', 'emails'),
          message: {
            to: `${user.email}`
          },
          locals: {
            title: 'Password Reset Request',
            message:
              `We just got a request to reset your password.\n\n testing` +
              'Please click the button below, or paste this url into your browser to complete the process:\n\n testig testing testing' +
              `https://app.synapseprep.net/resetpassword/${token}`,
            buttonText: 'Reset Password',
            buttonLink: `https://app.synapseprep.net/resetpassword/${token}`,
            subject: 'Synapse Prep Password Reset Request'
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

export default app;
