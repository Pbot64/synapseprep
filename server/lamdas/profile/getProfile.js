// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
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
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//* @route   POST api/profile/getProfile
//* @desc    Creates a new user profile or returns an existing one.
//* @access  Private

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    await mongoose();

    // Look for user profile
    let currentProfile = await Profile.findOne({ user: id });

    //* No user profile
    if (!currentProfile) {
      // Find initial tasks and then format their ids into an initial tasks history
      const initialTasks = await Task.find({ groupId: 1 });
      const initialTasksHistory = initialTasks.map(initialTask => {
        return {
          taskContent: initialTask._id
        };
      });

      // Find initial questions and then format their ids into an initial questions history
      const initialTaskIds = initialTasks.map(initialTask => initialTask.taskId);
      const initialQuestions = await Question.find({ questionId: { $in: initialTaskIds } });
      const initialQuestionsHistory = initialQuestions.map(newQuestion => {
        return {
          questionContent: newQuestion._id
        };
      });

      // Create and save new user profile
      const newProfile = await new Profile({
        user: id,
        tasksHistory: initialTasksHistory,
        questionsHistory: initialQuestionsHistory
      }).save();

      console.log('Made new profile');
      currentProfile = newProfile;

      //* Has user profile
    } else {
      // Fitler out completed tasks
      currentProfile.tasksHistory = currentProfile.tasksHistory.filter(
        tasks => tasks.completed === false
      );

      // Fitler out completed questions
      currentProfile.questionsHistory = currentProfile.questionsHistory.filter(
        question => question.completed === false
      );
    }

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
    res.send(profile);
  }
);

export default app;
