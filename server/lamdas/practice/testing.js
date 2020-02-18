// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

// Load models
import User from '../../models/User';
import Profile from '../../models/Profile';
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

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    await mongoose();

    // Find profile
    const hasProfile = await Profile.findOne({ user: id });
    if (false) {
      // Send back the user's profile
      const profile = await Profile.findOne({ user: id })
        .populate('users')
        .populate({
          path: 'tasksHistory.task',
          model: 'tasks',
          match: {
            groupId: 1
          }
        })
        .populate({ path: 'questionsHistory.question', model: 'questions' });

      // res.send(initialTasks);

      res.send(profile);

      console.log('found profile and sent to client');
    } else {
      let initialTasks = await Task.aggregate([
        {
          $lookup: {
            from: 'questions',
            let: { taskId: '$taskId', subject: '$subject' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$questionId', '$$taskId'] }, { $eq: ['$subject', '$$subject'] }]
                  }
                }
              }
            ],
            as: 'questions'
          }
        },
        {
          $match: {
            groupId: 1
          }
        }
      ]);

      console.log(initialTasks);
      // Find initial tasks

      // let i;
      // let x = 0;
      // let subjects = ['Math', 'Reading', 'Writing'];
      // let initialTaskHistory = [];
      // for (i = 1; i < 10; i++) {
      //   if (initialTaskHistory.length === 9) {
      //     break;
      //   }

      //   initialTaskHistory.push({
      //     taskId: i,
      //     subject: subjects[x]
      //   });

      //   if (i === 3) {
      //     i = 0;
      //     x++;
      //   }
      // }

      const testingTasks = await Task.find({ groupId: 1 });

      console.log(testingTasks);

      // // Organize initial tasks
      // const initialMathTasks = initialTasks.filter(task => task.subject === 'Math');
      // const initialReadingTasks = initialTasks.filter(task => task.subject === 'Reading');
      // const initialWritingTasks = initialTasks.filter(task => task.subject === 'Writing');

      const profileTasks = initialTasks.map(initialTask => {
        return {
          task: initialTask._id
        };
      });
      // const readingProfileTasks = initialReadingTasks.map(initialTask => {
      //   if (initialTask.subject === 'Reading') {
      //     return {
      //       task: initialTask._id
      //     };
      //   }
      // });
      // const writingProfileTasks = initialWritingTasks.map(initialTask => {
      //   if (initialTask.subject === 'Writing') {
      //     return {
      //       task: initialTask._id
      //     };
      //   }
      // });

      // const profileTasks = {
      //   math: mathProfileTasks,
      //   reading: readingProfileTasks,
      //   writing: writingProfileTasks
      // };

      const initialTaskIds = initialTasks.map(initialTask => initialTask.taskId);

      // console.log(initialTaskIds);

      const newQuestions = await Question.find({ questionId: { $in: initialTaskIds } });

      const profileQuestions = newQuestions.map(newQuestion => {
        return {
          question: newQuestion._id
        };
      });

      // const newQuestions = await Question.aggregate([
      //   {
      //     $lookup: {
      //       from: 'passages',
      //       let: { questionId: '$questionId', subject: '$subject' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [{ $eq: ['$passageId', '$$questionId'] }, { $eq: ['$subject', '$$subject'] }]
      //             }
      //           }
      //         },
      //         { $project: { _id: 0 } }
      //       ],
      //       as: 'passage'
      //     }
      //   },
      //   {
      //     $match: {
      //       questionId: { $in: initialTaskIds }
      //     }
      //   }
      // ]);

      const newProfile = new Profile({
        user: id,
        tasksHistory: profileTasks,
        questionsHistory: profileQuestions
      });
      res.send(newProfile);
      // .save()
      // .then(newProfile => {
      //   // const testing = profile.populate('tasks.task');
      //   res.send(newProfile);
      // });
      // const testing = await Profile.findOne({ test: 'Paul9' }).populate({
      //   path: 'tasks.task',
      //   model: 'tasks',
      //   match: {
      //     groupId: 1
      //   },
      //   populate: { path: 'questions', model: 'questions' }
      // });

      // res.send(testing);
    }
  }
);

export default app;
