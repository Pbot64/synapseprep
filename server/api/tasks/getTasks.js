// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import mongooseLibrary from 'mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Load models
import User from '../../models/User';
import Task from '../../models/Task';
import Profile from '../../models/Profile';
import Question from '../../models/Question';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    await mongoose();
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          console.log('user', user);
          return done(null, user);
        }
        console.log('nouser', jwt_payload);
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

// @route Get api/connect
// @desc Tests post route
// @access Public

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id = '' } = req.user;
    const { currentTasksIds } = req.body;
    console.log('currentTasksIds', currentTasksIds);
    await mongoose();

    // Look for user profile
    let currentProfile = await Profile.findOne(req.user && { user: id });

    // const initialTasks = await Task.find({
    //   _id: {
    //     $in: currentTasksIds.map(id => {
    //       console.log('mongoose.Types.ObjectId(id)', mongooseLibrary.Types.ObjectId(id));
    //       console.log('id type', typeof mongooseLibrary.Types.ObjectId(id));
    //       return mongooseLibrary.Types.ObjectId(id);
    //     })
    //   }
    // });

    const validCurrentTasksIds = currentTasksIds.filter(id =>
      mongooseLibrary.Types.ObjectId.isValid(id)
    );

    console.log('validCurrentTasksIds', validCurrentTasksIds);

    const currentTasks = await Task.find({
      _id: {
        $in: validCurrentTasksIds
      }
    });

    console.log('currentTasks', currentTasks);
    // const initialTasksHistory = initialTasks.map(initialTask => {
    //   return {
    //     taskContent: initialTask._id
    //   };
    // });

    // const initialQuestions = await Question.find({ questionId: { $in: initialTaskIds } }).sort({
    //   questionId: 1,
    //   questionNum: 1
    // });
    // const initialQuestionsHistory = initialQuestions.map(initialQuestion => {
    //   return {
    //     questionContent: initialQuestion._id
    //   };
    // });

    // Populate user profile
    const profile = await currentProfile
      .populate('user')
      .populate({
        path: 'tasksHistory.taskContent',
        model: 'tasks'
      })
      .populate({ path: 'questionsHistory.questionContent', model: 'questions' })
      .execPopulate();

    // Return user profile to client
    res.send(currentTasks);
  }
);

export default app;
