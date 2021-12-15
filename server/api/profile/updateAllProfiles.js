// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';

// Load Task model
import Profile from '../../models/Practice';
import Task from '../../models/Task';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/connect
// @desc Tests post route
// @access Public
app.get('*', async (req, res) => {
  await mongoose();

  const currentTasks = await Task.find();

  const updatedProfiles = await Profile.updateMany(
    {},
    { tasks: currentTasks },
    { isDeleted: true }
  );

  console.log(updatedProfiles.n); // Number of documents matched
  console.log(updatedProfiles.nModified); // Number of documents modified

  res.send(updatedProfiles);
});

export default app;
