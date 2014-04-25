'use strict';
(function() {
  var gameOfLife = {};
  var cellModule = require("./cell.js");
  gameOfLife.liveCell = cellModule.liveCell;
  gameOfLife.deadCell = cellModule.deadCell;
  gameOfLife.parser = require('./patternparser.js');
  gameOfLife.world = require('./world.js');
  gameOfLife.pattern = function(patternName) {
    return require('./patterName');
  };
  module.exports = gameOfLife;
})();