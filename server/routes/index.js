const express = require('express');
const authRoute = require('./auth.route');
const questionRoute = require('./question.route');
const commentsRoute = require('./comments.route');


router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/questions',
    route: questionRoute
  }, {
    path: '/comments',
    route: commentsRoute
  }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports= router;
