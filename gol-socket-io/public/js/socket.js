'use strict';
define(function (require) {
  require(['./canvas'], function(canvas) {
    var socket = io.connect('/');
    socket.on('ping', function (data) {
      console.log(data);
      canvas(JSON.parse(data));
    });
  });
});