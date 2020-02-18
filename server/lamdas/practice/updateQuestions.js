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

//* @route   POST api/practice/updateQuestions
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

    console.log(
      'test',
      currentQuestions[assignment][currentQuestions[assignment].length - 1].completed
    );

    // If the last question is completed then...
    if (currentQuestions[assignment][currentQuestions[assignment].length - 1].completed) {
      console.log(
        'currentQuestions[assignment].length -1',
        currentQuestions[assignment].length - 1
      );

      // // Save completed questions
      // // ! Should push to currrentQuestions[assignment], but I can't get the syntax to work.
      // await Practice.findOneAndUpdate(
      //   { user: id },
      //   { $push: { currentQuestions: { $each: currentQuestions[assignment] } } }
      // );

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

      const currentTasks = tasks[assignment];

      const currentTasksIds = currentTasks.map(currentTask => currentTask.taskId);

      const newQuestions = await Question.aggregate([
        {
          $lookup: {
            from: 'passages',
            let: { questionId: '$questionId', subject: '$subject' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$passageId', '$$questionId'] },
                      { $eq: ['$subject', '$$subject'] }
                    ]
                  }
                }
              },
              { $project: { _id: 0 } }
            ],
            as: 'passage'
          }
        },
        {
          $match: {
            questionId: { $in: currentTasksIds }
          }
        }
      ]);

      // Filter new questions based on assignment #
      if (assignment === 0) {
        const newMathQuestions = newQuestions.filter(newQuestion => newQuestion.subject === 'Math');
        MathQuestions = newMathQuestions;
      } else if (assignment === 1) {
        const newReadingQuestions = newQuestions.filter(
          newQuestion => newQuestion.subject === 'Reading'
        );
        ReadingQuestions = newReadingQuestions;
      } else if (assignment === 2) {
        const newWritingQuestions = newQuestions.filter(
          newQuestion => newQuestion.subject === 'Writing'
        );
        WritingQuestions = newWritingQuestions;
      }

      const newQuestionsGrouped = [MathQuestions, ReadingQuestions, WritingQuestions];

      // Assignment Complete: find practice and replace current questions with new questions
      const practiceWithNewQuestions = await Practice.findOneAndUpdate(
        { user: id },
        { questions: newQuestionsGrouped },
        { new: true }
      ).populate('user');
      console.log('new questions', practiceWithNewQuestions);
      res.json(practiceWithNewQuestions);
    } else {
      // Assignment In-progress: find practice and update current questions when user presses 'Save and Quit'
      const practiceWithUpdatedQuestions = await Practice.findOneAndUpdate(
        { user: id },
        { questions: currentQuestions },
        { new: true }
      ).populate('user');
      console.log('updated questions', practiceWithUpdatedQuestions);
      res.json(practiceWithUpdatedQuestions);
    }
  }
);

export default app;
