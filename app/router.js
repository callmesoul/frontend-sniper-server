'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.auth.index);
  router.post('/createError', controller.error.index);
  router.get('/', controller.home.index);

};
