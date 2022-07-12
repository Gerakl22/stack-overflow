const express = require('express');
const config = require('./config/config');

const app = express();

app.use(express.json());

const start = () => {
  try {
    app.listen(config.port, () => console.log(`Listening to port ${config.port}`));
  } catch (e) {
    console.log(e);
  }
}

start();
