// Load User model
import User from '../../models/User';

const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const keys = require('../../config/keys');

// Load Imput Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateChangePassInput = require('../../validation/change-pass');
const validateResetInput = require('../../validation/reset');

// @route Get api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users Works'
  })
);

// @route Get api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      res.status(400).json(errors);
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
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route Get api/users/login
// @desc Login User / Returning JWT TOken
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;

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
          keys.secretOrKey,
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
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

// @route Get api/users/changepass
// @desc Change Password
// @access Private
router.post('/changepass', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateChangePassInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
});

// @route Get api/users/reset
// @desc Send Email with Password Reset Token
// @access Public
router.post('/reset', (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;

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
    res.json(token);
    user.resetPasswordToken = token;
    (user.resetPasswordExpires = Date.now() + 3600000),
      user.save(err => {
        if (err) {
          console.error(err);
        }
      });

    console.log({ email: keys.emailUser });
    console.log({ password: keys.emailPassword });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: `${keys.emailUser}`,
        pass: `${keys.emailPassword}`
      }
    });
    const mailOptions = {
      from: 'caine316@gmail.com',
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

// @route Get api/users/resetpassword
// @desc Authenticate password reset link
// @access Public
router.get('/resetpassword', (req, res) => {
  console.log(req.query.resetPasswordToken);
  const { errors, isValid } = validateChangePassInput(req.body);
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

// @route Get api/users/resetpassword
// @desc Update Password Via Email
// @access Public
router.put('/updatePasswordViaEmail', (req, res) => {
  const { errors, isValid } = validateChangePassInput(req.body);
  const BCRYPT_SALT_ROUNDS = 12;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log(req.body.resetPasswordToken);
  User.findOne({
    resetPasswordToken: req.body.resetPasswordToken
  })
    .then(user => {
      console.log(user);
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
            user.save(function(err) {
              if (err) {
                console.error(err);
              }
              console.log(user);
            });
          })
          .catch(err => console.log(err))
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
