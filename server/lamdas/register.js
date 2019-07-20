// Node Modules
import express from 'express';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import gravatar from 'gravatar';
import nodemailer from 'nodemailer';
import mongoose from '../lib/mongoose';
import Email from 'email-templates';
import path from 'path';

// Load User model
import User from '../models/User';

// Load Input Validation
import validateRegisterInput from '../validation/register';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine setup
app.set('view engine', 'pug');
app.set('views', '../');

// @route Get api/users/register
// @desc Register user
// @access Public
app.post('*', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  await mongoose();

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }
      console.log(req.body.email);
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
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
                  from: 'support@synapseprep.net',
                  subject: `Hey ${user.name
                    .split(' ')
                    .slice(0, -1)
                    .join(' ')}, Welcome to Synapse Prep!`
                  // attachments: [
                  //   {
                  //     filename: "Logo.png",
                  //     path: "../../client/src/assets/images/logo-email.png",
                  //     cid: "logo" //same cid value as in the html img src
                  //   }
                  // ]
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
                    title: 'Welcome to Synapse Prep!',
                    message:
                      "We're super excited to help you and/or your kiddo to meet and surpass your academic goals. \n\n" +
                      "For starters, clicking the green button below will take you to our free online courses. Feel free to reply to this email or call ‪(512) 481-2485‬ if you're looking for a extra help and we'll connect you with one of our incredible personal tutors.",
                    buttonText: 'Get to Learning',
                    buttonLink: 'https://app.synapseprep.net/login'
                  }
                })
                .then(email => {
                  res.status(200).json({
                    email: email,
                    currentUser: user,
                    emailSent: true
                  });
                })
                .catch(console.error);
            })
            .catch(console.error);
        });
      });
    })
    .catch(err => console.log(err));
});

export default app;
