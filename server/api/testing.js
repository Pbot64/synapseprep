import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route Get api/test
// @desc Tests post route
// @access Public
app.get('*', async (req, res) => {
  res.send('You are connected');
});

export default app;
