// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';

// Load Task model
import Task from '../../models/Task';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Post api/tasks/newTask
// @desc Creates a new task that sets the title to user input value
// @access Public
app.post('*', async (req, res) => {
  const { newTaskTitle } = req.body;
  await mongoose();
  console.log('newTaskTitle', newTaskTitle);
  const newTask = new Task();
  newTask.title = newTaskTitle;
  //   await newTask.save();
  res.json(newTask);
});

export default app;
