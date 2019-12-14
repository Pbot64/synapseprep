// Node Modules
import express from 'express';
// import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';
import mongoose from '../lib/mongoose';
// import Email from 'email-templates';
// import path from 'path';

// Load User model
// import User from '../models/User';
import Rep from '../models/Rep';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // View engine setup
// app.set('view engine', 'pug');
// app.set('views', '../');

// @route Get api/users/testing
// @desc Testing
// @access Public
app.post('*', async (req, res) => {
  await mongoose();

  //   const reps = [
  //     {
  //       fname: 'Nick',
  //       lname: 'Lira',
  //       email: 'nick.lira@synapseprep.net',
  //       password: 'lalalala',
  //       gotLead: false
  //     },
  //     {
  //       fname: 'Spencer',
  //       lname: 'Riolo',
  //       email: 'spencer.riolo@synapseprep.net',
  //       password: 'lalalala',
  //       gotLead: false
  //     }
  //   ];

  // Finds all reps in db
  const reps = await Rep.find();
  console.log('reps', reps);

  // Finds first rep in 'reps' array that does not have a lead
  const currentRep = reps.find(({ gotLead }) => gotLead === false);

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
    await Rep.updateMany({}, { gotLead: false });
    await Rep.findOneAndUpdate({}, { gotLead: true });

    // resetreps.forEach(async resetrep => await resetrep.save());
    console.log(resetreps, 'resetreps');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
      user: currentRep.email,
      pass: currentRep.password
    }
  });

  const email = new Email({
    transport: transporter,
    message: {
      from: currentRep.email,
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
        message:
          "We're super excited to help you and/or your kiddo to meet and surpass your academic goals. \n\n" +
          "For starters, clicking the green button below will take you to our free online courses. Feel free to reply to this email or call ‪(512) 481-2485‬ if you're looking for a extra help and we'll connect you with one of our incredible personal tutors.",
        buttonText: 'Get to Learning',
        buttonLink: 'https://app.synapseprep.net/login'
      }
    })
    .then(email => {
      currentRep.gotLead = true;
      currentRep.save();
      res.json({
        email: email,
        currentUser: user,
        emailSent: true
      });
    })
    .catch(console.error);
});

export default app;
