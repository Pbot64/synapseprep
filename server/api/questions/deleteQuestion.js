// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';

// Load Task model
import Question from '../../models/Question';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/connect
// @desc Tests post route
// @access Public
app.post('*', async (req, res) => {
  await mongoose();
  console.log('req.body', req.body);
  let { _id } = req.body;
  await Question.findByIdAndDelete(_id);
  res.send('Deleted Question');
});

export default app;
