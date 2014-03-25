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
    function highest(dimension) {
      return us.reduce(board, function(highestY, compareY) {
        if (!highestY) return compareY;
        if (highestY[dimension] > compareY[dimension]) return highestY;
        return compareY;
      })[dimension] + 2;
    }
    function lowest(dimension) {
      return us.reduce(board, function(highestY, compareY) {
        if (!highestY) return compareY;
        if (highestY[dimension] < compareY[dimension]) return highestY;
        return compareY;
      })[dimension] - 1;
    }
    function createNextLifeForCellAt(thisCell) {
      var cellNeighbors = neighbors(thisCell, board);
      var nextState = rules.nextLife(thisCell, cellNeighbors);
      if (nextState) return createCell(nextState, thisCell.x, thisCell.y);
      return null;
    }
    return {
      find: find,
      nextLife: function() {
        board = us.map(us.range(lowest('y'), highest('y')), function(yIndex) {
          return us.map(us.range(lowest('x'), highest('x')), function(xIndex) {
            return createNextLifeForCellAt(find(xIndex, yIndex));
          });
        });
        board = us.chain(board).flatten().compact().value();
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