// // Node Modules
// import express from 'express';
// import bodyParser from 'body-parser';
// import configPassportModule from '../../config/passport';
// import passport from 'passport';
// import mongoose from '../../lib/mongoose';

// const app = express();

// // Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Passport middleware
// app.use(passport.initialize());

// mongoose();
// console.log('hello your in facebook');
// // Passport config
// configPassportModule(passport);

// // Redirect the user to Facebook for authentication.  When complete,
// // Facebook will redirect the user back to the application at
// //     /auth/facebook/callback
// app.get('/login', passport.authenticate('facebook'));

// // Facebook will redirect the user to this URL after approval.  Finish the
// // authentication process by attempting to obtain an access token.  If
// // access was granted, the user will be logged in.  Otherwise,
// // authentication has failed.
// app.get(
//   '/return',
//   passport.authenticate('facebook', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login'
//   })
// );

// export default app;

//* Added to now.json
// {
//   "src": "/api/users/facebook/login",
//   "dest": "/server/api/users/facebook.js"
// },
// {
//   "src": "/api/users/facebook/return",
//   "dest": "/server/api/users/facebook.js"
// },
