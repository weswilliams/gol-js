(function () {
  "use strict";

  var us = require('underscore');
  var cell = require('./cell.js');
  var rules = require('./rules.js');
  var neighbors = require('./neighbors.js');

  function createCell(state, x, y) {
    return cell(state, x, y);
  }

  function parseRowPattern(rowPattern, rowIndex) {
    var rowCellStates = rowPattern.split('');
    return us.map(rowCellStates, function (cellState, columnIndex) {
      return createCell(cellState === "1", columnIndex, rowIndex);
    });
  }

  function parseBoardPattern(boardPattern) {
    return us.chain(boardPattern.split('\n'))
      .map(parseRowPattern).flatten().value();
  }

  module.exports = function (boardPattern) {
    var board = parseBoardPattern(boardPattern);
    function find(x, y) {
      return us.find(board, function (cell) {
        return cell.x === x && cell.y === y;
      }) || cell(false, x, y);
    }
    return {
      find: find,
      nextLife: function() {
        board = us.map(board, function(thisCell) {
          var cellNeighbors = neighbors(thisCell, board);
          var nextState = rules.nextLife(thisCell, cellNeighbors);
          return cell(nextState, thisCell.x, thisCell.y)
        });
      },
      patternFor: function(startCell, endCell) {
        var xRange = us.range(startCell.x, endCell.x + 1);
        var yRange = us.range(startCell.y, endCell.y + 1);
        return us.reduce(yRange, function(pattern, yIndex) {
          return us.reduce(xRange, function(pattern, xIndex) {
            var cell = find(xIndex, yIndex);
            if (cell.state()) return pattern + "1";
            return pattern + 0;
          }, pattern) + "\n";
        }, "").trim();
      }
    }
  };
})();