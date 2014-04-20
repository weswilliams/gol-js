'use strict';
define(function () {
  var socket = io.connect('/');
  socket.on('ping', function (data) {
    console.log(data);
  });
});