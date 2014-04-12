(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require('./cell.js');
  var liveCell = cellModule.liveCell;
  var deadCell = cellModule.deadCell;
  var zombieCell = cellModule.zombieCell;
  var coordinates = require('./coordinates.js');

  liveCell.addAction = function(x, y, board) {
    board.push(coordinates(x, y, liveCell));
  };
  deadCell.addAction = function() { };
  zombieCell.addAction = function(x, y, board) {
    board.push(coordinates(x, y, zombieCell));
  };

  function createCoordinates(hasALiveCell, x, y) {
    var cell = hasALiveCell ? liveCell : deadCell;
    return coordinates(x, y, cell);
  }

  module.exports = function () {
    var board = [], lifeCount = 1;

    function find(x, y) {
      return us.find(board, function (cell) {
        return cell.x === x && cell.y === y;
      }) || createCoordinates(false, x, y);
    }

    function findCellAtCoordinates(x, y) { return find(x, y).cell; }

    function addIfUniqueCoordinates(all, coordinate) {
      if (!us.find(all, function(existing) {
        return existing.hasSameLocationAs(coordinate);
      })) {
        all.push(coordinate);
      }
    }

    return {
      lifeCount: function() { return lifeCount; },
      liveCellsAndNeighbors: function() {
        var cellsAndNeighbors = us.map(board, function(coordinate) { return coordinate; });
        us.each(board, function(nextCoordinates) {
          nextCoordinates.forEachNeighbor(function(x, y) {
            addIfUniqueCoordinates(cellsAndNeighbors, createCoordinates(false, x, y));
          });
        });
        return cellsAndNeighbors;
      },
      addCellAt: function (x, y, cell) {
        cell.addAction(x, y, board);
      },
      nextLife: function () {
        var nextBoard = [];
        us.each(this.liveCellsAndNeighbors(), function(coordinates) {
          coordinates.nextLife(board, function(nextLifeCell) {
            nextLifeCell.addAction(coordinates.x, coordinates.y, nextBoard);
          });
        });
        board = nextBoard;
        lifeCount++;
      },
      patternFor: function (startCoordinates, endCoordinates, coordinateAction, rowAction) {
        function isAliveAction(xIndex, yIndex) {
          coordinateAction(findCellAtCoordinates(xIndex, yIndex));
        }
        coordinates.coordinatesIterator(startCoordinates, endCoordinates)(isAliveAction, rowAction);
      }
    };
  };
})();