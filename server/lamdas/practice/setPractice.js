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
import Passage from '../../models/Passage';

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
//* @desc    Returns initial task and question sets
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

      console.log('found practice and sent to client');
      res.json(practice);
    } else {
      // const initialTasks = await Tasks.aggregate([
      //   {
      //     $lookup: {
      //       from: 'questions',
      //       let: { taskId: '$taskId', subject: '$subject' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [{ $eq: ['$questionId', '$$taskId'] }, { $eq: ['$subject', '$$subject'] }]
      //             }
      //           }
      //         }
      //       ],
      //       as: 'questions'
      //     }
      //   },
      //   {
      //     $match: {
      //       groupId: 1
      //     }
      //   }
      // ]);
      // Find 9 initial tasks
      const initialMathTasks = await Task.find({ groupId: 1, subject: 'Math' }).sort({ taskId: 1 });

      const initialReadingTasks = await Task.find({ groupId: 1, subject: 'Reading' }).sort({
        taskId: 1
      });

      const initialWritingTasks = await Task.find({ groupId: 1, subject: 'Writing' }).sort({
        taskId: 1
      });
      const initialTasks = [initialMathTasks, initialReadingTasks, initialWritingTasks];

      // const initialTasks = { math: initialMathTasks, reading: initialReadingTasks, writing: initialWritingTasks};

      // Find initial questions
      const initialQuestions = await Question.aggregate([
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
              {
                $project: { _id: 0 }
              }
            ],
            as: 'passage'
          }
        },
        {
          $match: {
            $or: [{ questionId: 1 }, { questionId: 2 }, { questionId: 3 }]
          }
        },
        {
          $project: { _id: 0 }
        },
        {
          $unwind: { path: '$passage', preserveNullAndEmptyArrays: true }
        }
      ]);

      // const currentTasks = { math: {}, reading: {}, writing: {} };

      const initialMathQuestions = initialQuestions.filter(question => question.subject === 'Math');

      const initialReadingQuestions = initialQuestions.filter(
        question => question.subject === 'Reading'
      );

      const initialWritingQuestions = initialQuestions.filter(
        question => question.subject === 'Writing'
      );

      const initialQuestionsGrouped = [
        initialMathQuestions,
        initialReadingQuestions,
        initialWritingQuestions
      ];

      // Create and save practice with initial tasks and questions
      new Practice({
        user: id,
        tasks: initialTasks,
        questions: initialQuestionsGrouped,
        completedQuestions: [[], [], []]
      })
        .populate('user')
        .populate('tasks')
        .save()
        .then(newPractice => {
          console.log('created and saved Practice');
          res.json(newPractice);
        });
    }
  }
);

export default app;
