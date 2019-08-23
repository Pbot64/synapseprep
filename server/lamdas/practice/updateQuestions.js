// Node modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

// Load models
import User from '../../models/User';
import Question from '../../models/Question';
import Practice from '../../models/Practice';

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
    console.log(jwt_payload);
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          console.log(user);
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//* @route   POST api/updateQuestions
//* @desc    Returns current questions updated with store values or a new question set if current questions are complete.
//* @access  Private
app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    const { assignment, tasks, currentQuestions } = req.body;
    await mongoose();
    console.log('currentQuestions', currentQuestions);
    console.log('assignment', assignment);
    console.log('tasks', tasks);
    console.log('currentQuestions[assignment]', currentQuestions[assignment]);

    // If the last question is completed then...
    if (currentQuestions[assignment][currentQuestions[assignment].length - 1].completed === true) {
      console.log(
        'currentQuestions[assignment].length -1',
        currentQuestions[assignment].length - 1
      );

      let MathQuestions = [];
      let ReadingQuestions = [];
      let WritingQuestions = [];

      if (currentQuestions[0].length !== 0) {
        MathQuestions = currentQuestions[0];
      }
      if (currentQuestions[1].length !== 0) {
        ReadingQuestions = currentQuestions[1];
      }
      if (currentQuestions[2].length !== 0) {
        WritingQuestions = currentQuestions[2];
      }
      // ! Should push to currrentQuestions[assignment], but I can't get the syntax to work.
      await Practice.findOneAndUpdate(
        { user: id },
        { $push: { currentQuestions: { $each: currentQuestions[assignment] } } }
      );
      // Filter 15 questions based on assignment #
      if (assignment === 0) {
        // Save completed questions

        const mathTasks = tasks[0];

        console.log('mathTasks', mathTasks);
        console.log('mathTasks[0].taskId', mathTasks[0].taskId);

        const mathTask1Id = mathTasks[0].taskId;
        const mathTask2Id = mathTasks[1].taskId;
        const mathTask3Id = mathTasks[2].taskId;

        const initialQuestions = await Question.find({
          $or: [
            { questionId: mathTask1Id },
            { questionId: mathTask2Id },
            { questionId: mathTask3Id }
          ]
        });

        const initialMathQuestions = initialQuestions.filter(
          initialQuestion => initialQuestion.subject === 'Math'
        );
        MathQuestions = initialMathQuestions;

        console.log('MathQuestions', MathQuestions);
      }
      if (assignment === 1) {
        const readingTasks = tasks[1];

        console.log('readingTasks', readingTasks);
        console.log('firstReadingTaskId', readingTasks[0].taskId);

        const readingTask1Id = readingTasks[0].taskId;
        const readingTask2Id = readingTasks[1].taskId;
        const readingTask3Id = readingTasks[2].taskId;

        const initialQuestions = await Question.find({
          $or: [
            { questionId: readingTask1Id },
            { questionId: readingTask2Id },
            { questionId: readingTask3Id }
          ]
        });

        const initialReadingQuestions = initialQuestions.filter(
          initialQuestion => initialQuestion.subject === 'Reading'
        );
        ReadingQuestions = initialReadingQuestions;

        console.log('ReadingQuestions', ReadingQuestions);
      }
      if (assignment === 2) {
        const writingTasks = tasks[2];
        const writingTask1Id = writingTasks[0].taskId;
        const writingTask2Id = writingTasks[1].taskId;
        const writingTask3Id = writingTasks[2].taskId;

        const initialQuestions = await Question.find({
          $or: [
            { questionId: writingTask1Id },
            { questionId: writingTask2Id },
            { questionId: writingTask3Id }
          ]
        });

        const initialWritingQuestions = initialQuestions.filter(
          initialQuestion => initialQuestion.subject === 'Writing'
        );
        WritingQuestions = initialWritingQuestions;
      }

      const initialQuestions = [MathQuestions, ReadingQuestions, WritingQuestions];
      console.log('initialQuestions', initialQuestions);

      // Find practice and create questions
      const newQuestions = await Practice.findOneAndUpdate(
        { user: id },
        { questions: initialQuestions },
        { new: true }
      ).populate('user');
      console.log('new questions', newQuestions);
      res.json(newQuestions);
    } else {
      // Find Practice and update questions
      const updatedQuestions = await Practice.findOneAndUpdate(
        { user: id },
        { questions: currentQuestions },
        { new: true }
      ).populate('user');
      console.log('updated questions', updatedQuestions);
      res.json(updatedQuestions);
    }
  }
);

export default app;
