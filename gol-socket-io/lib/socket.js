"use strict";
module.exports.listen = function(app) {

  var io = require('socket.io').listen(app);
  var patternName = "pulsar";
  var liveCell = require('../../cell.js').liveCell;
  var parser = require("../../patternparser.js");
  var world = require('../../world.js');

  io.sockets.on('connection', function (socket) {
    console.log('create new game');
    var game = world();
    console.log('load pattern ' + patternName);
    parser(require("../../" + patternName), function(x, y, isAlive) {
      game.addCellAt(x,y,isAlive); });
    console.log('setInterval');
    var interval = setInterval(function(){
      console.log('next interval');
      var liveCoordinates = [];
      game.patternFor({x:0,y:0},{x:50,y:50}, function(coordinates) {
        if (coordinates.cell === liveCell) {
          liveCoordinates.push(coordinates);
        }
      }, function(){});
      socket.emit('ping', JSON.stringify(liveCoordinates));
      game.nextLife();
    }, 250);
    socket.on('disconnect', function() {
      console.log('stop interval');
      clearInterval(interval);
    });
  });

  return io;
};