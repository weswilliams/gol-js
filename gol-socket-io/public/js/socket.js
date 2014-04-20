'use strict';
define(function (require) {
  require(['./canvas'], function() {
    var socket = io.connect('/');
    socket.on('ping', function (data) {
      console.log(data);
    });
  });
});