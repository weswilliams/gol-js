"use strict";
module.exports.listen = function(app) {

  var io = require('socket.io').listen(app);
  var patternName = "pulsar";
  var liveCell = require('../../cell.js').liveCell;
  var parser = require("../../patternparser.js");
  var world = require('../../world.js');
  var game = world();
  parser(require("../../" + patternName), function(x, y, isAlive) {
    game.addCellAt(x,y,isAlive); });


  io.sockets.on('connection', function (socket) {
    setInterval(function(){
      var liveCoordinates = [];
      game.patternFor({x:0,y:0},{x:24,y:24}, function(coordinates) {
        if (coordinates.cell === liveCell) {
          liveCoordinates.push(coordinates);
        }
      }, function(){});
      socket.emit('ping', JSON.stringify(liveCoordinates));
    }, 500);
  });

  return io;
};