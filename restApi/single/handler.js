'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Logic
var lib = require('../lib');

// Lambda Handler
module.exports.handler = function(event, context) {
  var error = new Error('The requested resource was not found, I did this on purpose');
  context.done(error);


  // lib.singleAll(event, function(error, response) {
  //   return context.done(error, response);
  // });
};