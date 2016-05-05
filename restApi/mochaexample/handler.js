'use strict';

module.exports.handler = function(event, context, cb) {
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};

module.exports.delayedMap = function(array, transform, callback) {
  setTimeout(function() {
    callback(array.map(transform));
  }, 100);
};

module.exports.promisedMap = function(array, transform) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(array.map(transform));
    }, 100);
  });
};