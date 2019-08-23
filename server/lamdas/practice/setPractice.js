// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

// Load models
import User from '../../models/User';
import Practice from '../../models/Practice';
import Task from '../../models/Task';
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

//* @route   GET api/practice/setPractice
//* @desc    Returns initial task set and question set
//* @access  Private

app.get(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    await mongoose();

    // Find practice
    const hasPractice = await Practice.findOne({ user: id });
    if (hasPractice) {
      // Send back the user's practice
      const practice = await Practice.findOne({ user: id }).populate('user');
      console.log('found practice and sent to client ');
      res.json(practice);
    } else {
      // Find 9 initial tasks
      const initialMathTasks = await Task.find({ groupId: 1, subject: 'Math' }).sort({ taskId: 1 });

      const initialReadingTasks = await Task.find({ groupId: 1, subject: 'Reading' }).sort({
        taskId: 1
      });

      const initialWritingTasks = await Task.find({ groupId: 1, subject: 'Writing' }).sort({
        taskId: 1
      });

      const initialTasks = [initialMathTasks, initialReadingTasks, initialWritingTasks];

      // Find initial questions
      const allInitialQuestions = await Question.find({
        $or: [{ questionId: 1 }, { questionId: 2 }, { questionId: 3 }]
      });

      const initialMathQuestions = allInitialQuestions.filter(
        initialQuestion => initialQuestion.subject === 'Math'
      );
      const initialReadingQuestions = allInitialQuestions.filter(
        initialQuestion => initialQuestion.subject === 'Reading'
      );
      const initialWritingQuestions = allInitialQuestions.filter(
        initialQuestion => initialQuestion.subject === 'Writing'
      );
      const initialQuestions = [
        initialMathQuestions,
        initialReadingQuestions,
        initialWritingQuestions
      ];

      // Create and save practice with initial tasks and questions
      new Practice({
        user: id,
        tasks: initialTasks,
        questions: initialQuestions,
        completedQuestions: [[], [], []]
      })
        .populate('user')
        .save()
        .then(newPractice => {
          console.log('created and saved Practice');
          res.json(newPractice);
        });
    }
  }
);

export default app;
