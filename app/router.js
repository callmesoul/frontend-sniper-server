'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.auth.index);
  router.post('/register', controller.auth.register);
  router.post('/createError', controller.error.index);
  router.get('/', controller.home.index);

  router.resources('apps', '/api/apps', controller.apps);
  router.resources('emails', '/api/emails', controller.emails);
  router.resources('configs', '/api/configs', controller.configs);
  router.resources('errors', '/api/errors', controller.errors);
  router.resources('users', '/api/users', controller.users);

};
