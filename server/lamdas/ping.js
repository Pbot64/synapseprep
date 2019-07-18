import express from 'express';

const app = express();

app.get('*', (req, res) =>
  res.json({
    msg: 'Pong'
  })
);

export default app;
