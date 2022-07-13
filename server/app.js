const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes/index');
const xmlParser = require('express-xml-bodyparser')
const xss = require('xss-clean');

const app = express();

const httpClient = http.createServer(app);

//get data from client side
app.use(cors());
//Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
//Convert data in json format
app.use(express.json());
// parse xml request body
app.use(xmlParser());
// parse urlencoded request body
app.use(express.urlencoded({extended: true}));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use('/api', routes);


module.exports = {
  app,
  httpClient
}
