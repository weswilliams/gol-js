'use strict';
module.exports.listen = function (app) {

  var io = require('socket.io').listen(app);
  var patternName = 'pulsar';
  var gol = require('gol-js');
  var liveCell = gol.liveCell;
  var parser = gol.parser;
  var world = gol.world;
  var pattern = gol.pattern;

  function createGameFor(patternName) {
    console.log('create new game');
    var game = world();
    console.log('load pattern ' + patternName);
    parser(pattern(patternName), function (x, y, isAlive) {
      game.addCellAt(x, y, isAlive);
    });
    return game;
  }

  function nextLife(game, socket) {
    console.log('next life');
    var liveCoordinates = [];
    game.patternFor({x: 0, y: 0}, {x: 50, y: 50}, function (coordinates) {
      if (coordinates.cell === liveCell) {
        liveCoordinates.push(coordinates);
      }
    }, function () { });
    socket.emit('ping', JSON.stringify(liveCoordinates));
    game.nextLife();
  }

  function endGameAt(interval) {
    console.log('stop game interval');
    clearInterval(interval);
  }

  io.sockets.on('connection', function (socket) {
    var game = createGameFor(patternName);
    console.log('setInterval');
    var interval = setInterval(function() { nextLife(game, socket); }, 250);
    socket.on('disconnect', function () { endGameAt(interval); });
  });

  return io;
};