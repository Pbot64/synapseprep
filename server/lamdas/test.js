const express = require('express');

const app = express();

app.get('*', (req, res) =>
  res.json({
    msg: 'Users Works'
  })
);

export default app;
