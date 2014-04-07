(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require('./cell.js');
  var liveCell = cellModule.liveCell;
  var deadCell = cellModule.deadCell;
  var coordinates = cellModule.coordinates;

  function doNothing() {
  }

  function createCoordinates(hasALiveCell, x, y) {
    var cell = hasALiveCell ? liveCell : deadCell;
    return coordinates(x, y, cell);
  }

  function parseRowPattern(rowPattern, rowIndex) {
    var rowCellStates = rowPattern.split('');
    return us.map(rowCellStates, function (cellState, columnIndex) {
      return createCoordinates(cellState === "1", columnIndex, rowIndex);
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
      }) || createCoordinates(false, x, y);
    }

    function higherThan(currentHighest, compareTo) { return currentHighest > compareTo; }
    function lowerThan(currentLowest, compareTo) { return currentLowest < compareTo; }

    function dimensionFilter(dimension, neighborAdjustment, compare) {
      return us.reduce(board, function (current, compareTo) {
        if (!current) { return compareTo; }
        if (compare(current[dimension], compareTo[dimension])) { return current; }
        return compareTo;
      })[dimension] + neighborAdjustment;
    }

    function rangeForNextLife(dimension) {
      return us.range(dimensionFilter(dimension, -1, lowerThan), dimensionFilter(dimension, 2, higherThan));
    }

    return {
      addCellAt: function (x, y, newCell) {

      },
      nextLife: function () {
        var nextBoard = [];
        us.each(rangeForNextLife('y'), function (yIndex) {
          us.each(rangeForNextLife('x'), function (xIndex) {
            find(xIndex, yIndex).nextLife(board, function (livesInNextLife) {
              if (livesInNextLife) {
                nextBoard.push(createCoordinates(livesInNextLife, xIndex, yIndex));
              }
            });
          });
        });
        board = nextBoard;
      },
      patternFor: function (startCoordinates, endCoordinates, xAction, yAction) {
        xAction = us.isFunction(xAction) ? xAction : doNothing;
        yAction = us.isFunction(yAction) ? yAction : doNothing;

        var xRange = us.range(startCoordinates.x, endCoordinates.x + 1);
        var yRange = us.range(startCoordinates.y, endCoordinates.y + 1);
        us.each(yRange, function (pattern, yIndex) {
          us.each(xRange, function (pattern, xIndex) {
            find(xIndex, yIndex).cell.isAlive(function (isAlive) {
              xAction(isAlive);
            });
          });
          yAction();
        });
      }
    };
  };
})();