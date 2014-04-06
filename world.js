(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require('./cell.js');
  var liveCell = cellModule.liveCell;
  var deadCell = cellModule.deadCell;
  var coordinates = cellModule.coordinates;

  function createCell(hasALiveCell, x, y) {
    var cell = hasALiveCell ? liveCell() : deadCell();
    return coordinates(x, y, cell);
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
      }) || createCell(false, x, y);
    }
    function highest(dimension) {
      return us.reduce(board, function(highestY, compareY) {
        if (!highestY) { return compareY; }
        if (highestY[dimension] > compareY[dimension]) { return highestY; }
        return compareY;
      })[dimension] + 2;
    }
    function lowest(dimension) {
      return us.reduce(board, function(highestY, compareY) {
        if (!highestY) { return compareY; }
        if (highestY[dimension] < compareY[dimension]) { return highestY; }
        return compareY;
      })[dimension] - 1;
    }

    return {
      isAlive: function(x, y) {
        return find(x,y).cell.isAlive();
      },
      nextLife: function() {
        var nextBoard = [];
        us.each(us.range(lowest('y'), highest('y')), function(yIndex) {
          us.each(us.range(lowest('x'), highest('x')), function(xIndex) {
            find(xIndex, yIndex).nextLife(board, function(nextLifeCell) {
              if (nextLifeCell.isAlive()) { nextBoard.push(coordinates(xIndex, yIndex, nextLifeCell)); }
            });
          });
        });
       board = nextBoard;
      },
      patternFor: function(startCell, endCell, alive, dead) {
        alive = alive || "1";
        dead = dead || "0";
        var xRange = us.range(startCell.x, endCell.x + 1);
        var yRange = us.range(startCell.y, endCell.y + 1);
        var pattern = us.reduce(yRange, function(pattern, yIndex) {
          return us.reduce(xRange, function(pattern, xIndex) {
            var coordinates = find(xIndex, yIndex);
            if (coordinates.cell.isAlive()) { return pattern + alive; }
            return pattern + dead;
          }, pattern) + "\n";
        }, "");
        return pattern.substr(0, pattern.length - 1);
      }
    };
  };
})();