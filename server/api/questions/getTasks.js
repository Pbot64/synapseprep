// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import http from 'http';

// Load Task model
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

  console.log('req', req);

  // const test = await http.request()

  const tasks = await Task.find();

  res.send(tasks);
});

export default app;
