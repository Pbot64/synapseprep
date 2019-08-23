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

//* @route   POST api/practice/setTasks
//* @desc    Returns new task set
//* @access  Private

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    const { currentTasks, assignment } = req.body;
    await mongoose();
    const currentGroup = currentTasks[assignment][0].groupId;

    let currentMathTasks = currentTasks[0];
    let currentReadingTasks = currentTasks[1];
    let currentWritingTasks = currentTasks[2];

    // Recieve 9 tasks from client, detect which 3 are marked as completed,
    // replace them, update practice, and send it back to client.
    if (assignment === 0) {
      // Save completed math tasks
      await Practice.findOneAndUpdate(
        { user: id },
        { $push: { completedTasks: currentMathTasks } }
      );

      // Get next group of math tasks
      const newMathTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Math' });
      currentMathTasks = newMathTasks;
    }

    if (assignment === 1) {
      const newReadingTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Reading' });
      currentReadingTasks = newReadingTasks;
    }

    if (assignment === 2) {
      const newWritingTasks = await Task.find({ groupId: currentGroup + 1, subject: 'Writing' });
      currentWritingTasks = newWritingTasks;
    }

    const updatedTasksArray = [currentMathTasks, currentReadingTasks, currentWritingTasks];

    console.log('updatedTasksArray', updatedTasksArray);

    // Update Practice 'tasks' array
    const updatedPractice = await Practice.findOneAndUpdate(
      { user: id },
      { tasks: updatedTasksArray },
      { new: true }
    ).populate('user');
    res.json(updatedPractice);
  }
);

export default app;
