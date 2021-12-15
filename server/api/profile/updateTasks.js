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

//* @route   POST api/practice/updateTasks
//* @desc    Updates users current tasks and returns new tasks
//* @access  Private

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    const { currentAssTasks } = req.body;

    const currentAssTasksIds = currentAssTasks.map(task => task.taskContent._id);

    const currentProfile = await Profile.findOne({
      user: id
    });

    // Update completed value for the user's task history
    currentProfile.tasksHistory.map(task => {
      let stringedTask = task.taskContent.toString();
      if (currentAssTasksIds.includes(stringedTask)) {
        task.completed = true;
      }
    });

    await currentProfile.save();

    // Find new group of tasks
    const newTasks = await Task.find({
      groupId: currentAssTasks[0].taskContent.groupId + 1,
      subject: currentAssTasks[0].taskContent.subject
    });

    // Return new task ids
    const newTasksIds = newTasks.map(newTask => {
      return {
        taskContent: newTask._id
      };
    });

    // Push new task ids to user's task history and save their updated profile
    currentProfile.tasksHistory.push(...newTasksIds);
    await currentProfile.save();

    // Fitler out completed tasks
    currentProfile.tasksHistory = currentProfile.tasksHistory.filter(
      tasks => tasks.completed === false
    );

    // Populate user's updated profile with task content.
    const profile = await currentProfile
      .populate({
        path: 'tasksHistory.taskContent',
        model: 'tasks'
      })
      .execPopulate();

    // Return user's updated task history to client
    res.send(profile.tasksHistory);
  }
);

export default app;
