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
  const { currentSubject = '' } = req.body;
  console.log('currentSubject', currentSubject);
  const newQuestion = new Question();
  newQuestion.subject = currentSubject;
  await newQuestion.save();
  res.json(newQuestion);
});

export default app;
