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
// @access Private
app.post('*', async (req, res) => {
  await mongoose();
  let { updatedQuestion } = req.body;
  let { questionContent } = updatedQuestion;
  let { _id } = questionContent;

  // Update current question or create a new question if it doesn't exist
  await Question.findByIdAndUpdate(_id, questionContent, {
    new: true
  });

  let updatedQuestions = await Question.find();

  res.json(updatedQuestions);
});

export default app;
