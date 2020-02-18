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
import Profile from '../../models/Profile';
import { assign } from 'nodemailer/lib/shared';

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

//* @route   POST api/practice/setTasks
//* @desc    Returns new task set
//* @access  Private

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    // const { id } = req.user;
    // const { currentTasks, assignment } = req.body;
    await mongoose();
    // const currentGroup = currentTasks[assignment][0].groupId;
    const currentGroup = 1;
    // let currentMathTasks = currentTasks[0];
    // let currentReadingTasks = currentTasks[1];
    // let currentWritingTasks = currentTasks[2];
    const assignment = 0;
    // Mark current tasks as completed
    const currentProfile = await Profile.findOne({
      test: 'Paul12'
    }).populate({ path: 'tasks.task', model: 'tasks' });

    if (assignment === 0) {
      const updatedProfile = currentProfile.tasks.map(task => {
        if (task.task.groupId === 1 && task.task.subject === 'Math') {
          return {
            completed: true,
            task: task.task._id
          };
        }
        return {
          completed: false,
          task: task.task._id
        };
      });
      console.log(updatedProfile);
      // Get next group of tasks
      const newMathTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Math' });
      const profileTasks = newMathTasks.map(initialTask => {
        return {
          completed: false,
          task: initialTask._id
        };
      });
      updatedProfile.push(...profileTasks);
      console.log(updatedProfile);
      res.send(updatedProfile);
    }

    // completedTasks.completed = true;

    // completedTasks.save;

    // if (assignment === 0) {
    //   // Get next group of tasks
    //   const newMathTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Math' });
    //   currentMathTasks = newMathTasks;
    // }

    // // newMathTasks.insert()

    // // Recieve 9 tasks from client, detect which 3 are marked as completed,
    // // replace them, update practice, and send it back to client.
    // if (assignment === 0) {
    //   // Save completed math tasks
    //   await Practice.findOneAndUpdate(
    //     { user: id },
    //     { $push: { completedTasks: currentMathTasks } }
    //   );
    // }

    // if (assignment === 1) {
    //   const newReadingTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Reading' });
    //   currentReadingTasks = newReadingTasks;
    // }

    // if (assignment === 2) {
    //   const newWritingTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Writing' });
    //   currentWritingTasks = newWritingTasks;
    // }

    // const updatedTasksArray = [currentMathTasks, currentReadingTasks, currentWritingTasks];

    // console.log('updatedTasksArray', updatedTasksArray);

    // // Update Practice 'tasks' array
    // const updatedPractice = await Practice.findOneAndUpdate(
    //   { user: id },
    //   { tasks: updatedTasksArray },
    //   { new: true }
    // ).populate('user');
    // res.json(updatedPractice);
  }
);

export default app;
