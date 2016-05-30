'use strict';

var mongoose = require('mongoose');

var mongoStatus = 'unconnected';
var start = function (mongoURL) {
  var conn = mongoose.connection;

  mongoose.connect(mongoURL);

  conn.on('error', function (err) {
    mongoStatus = err;
    console.error(err);
  });

  conn.on('connected', function () {
    mongoStatus = 'connected';
  });

  conn.on('disconnected', function () {
    mongoStatus = 'disconnected';
  });
};

function status () {
  return {
    mongodb: mongoStatus
  };
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

process.on('uncaughtException', function (err) {
  mongoStatus = err;
  console.log(err.stack);
});

module.exports = {
  start: start,
  status: status
};
