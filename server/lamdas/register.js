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
import Rep from '../models/Rep';

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
            .then(async user => {
              // Finds all reps in db
              const reps = await Rep.find();
              console.log('reps', reps);

              // Finds first rep in 'reps' array that does not have a lead
              let currentRep = reps.find(({ gotLead }) => gotLead === false);
              console.log('currentRep', currentRep);

              //* If all reps have leads then...
              if (!currentRep) {
                // Make first rep the current rep
                currentRep = reps[0];
                const resetreps = reps.map((rep, i) => {
                  if (i !== 0) {
                    rep.gotLead = false;
                  }
                  return rep;
                });
                // Reset all reps gotLead status in db...
                await Rep.updateMany({}, { gotLead: false });
                // expect for the first rep
                await Rep.findOneAndUpdate({}, { gotLead: true });

                // resetreps.forEach(async resetrep => await resetrep.save());
                console.log(resetreps, 'resetreps');
              }

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
                  replyTo: currentRep.email,
                  subject: `Hey ${user.name
                    .split(' ')
                    .slice(0, -1)
                    .join(' ')}, Welcome to Synapse Prep!`
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
                    message: `Hey ${user.name
                      .split(' ')
                      .slice(0, -1)
                      .join(' ')},

                    ${currentRep.fname} ${currentRep.lname} here from Synapse Prep.
                    I noticed you recently signed up with us and wanted to reach out to see if I could help answer any questions you may have. I'd love to learn more about your academic goals and help you find the best path forward to achieve them.`,
                    message2:
                      "You're also welcome to access our FREE test prep courses by clicking on the green button below.",
                    buttonText: 'Get to Learning',
                    buttonLink: 'https://app.synapseprep.net/login',
                    calendlyLink: currentRep.calendlyLink,
                    phone: currentRep.phone
                  }
                })
                .then(email => {
                  currentRep.gotLead = true;
                  currentRep.save();
                  res.status(200).json({
                    email: email,
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
