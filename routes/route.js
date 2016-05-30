'use strict';

exports.setRoutes = function (app) {
  app.use('/register', require('./routers/register'));
  app.use('/logic-puzzle', require('./routers/logic-puzzle'));
  app.use('/login', require('./routers/login'));
  app.use('/start', require('./routers/start'));
  app.use('/user-detail', require('./routers/user-detail'));
  app.use('/dashboard', require('./routers/dashboard'));
  app.use('/logout', require('./routers/logout'));
  app.use('/timer', require('./routers/timer'));
  app.use('/user-initialization', require('./routers/user-initialization'));
  app.use('/homework', require('./routers/homework'));
  app.use('/password', require('./routers/password'));
  app.use('/user', require('./routers/user'));
  app.use('/report', require('./routers/report'));
  app.use('/reuse', require('./routers/reuse'));
  app.use('/deadline', require('./routers/deadline'));
  app.use('/inspector', require('./routers/inspector'));
  app.use('/style-guide', require('./routers/style-guide'));
  app.use('/group', require('./routers/group'));
  app.use('/paper-assignment', require('./routers/paper-assignment'));
  app.use('/auth', require('./routers/auth'));
  app.use('/qa', require('./routers/qa'));
  app.use('/admin', require('./routers/admin'));
  app.use('/papers', require('./routers/papers'));
  app.use('/test', require('./routers/test'));
  app.use('/paper-draft', require('./routers/paper-draft'));
};
