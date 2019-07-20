import express from 'express';

function ping(req, res) {
  res.json({
    msg: 'Profile Pong'
  });
}

const app = express();
app.get('*', ping);

export { ping };
export default app;
