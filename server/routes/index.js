const authRoute = require('./auth.route');
const express = require('express');

router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute
  }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports= router;
