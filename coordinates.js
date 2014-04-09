(function () {
  "use strict";

  var us = require("underscore");
  var neighborsFilter = require("./neighborsFilter.js");

  function neighborRangeFor(me, dimension) {
    return us.range(me[dimension] - 1, me[dimension] + 2);
  }

  function countLiveCellsIn(neighbors) {
    return us.reduce(neighbors, function (count, neighbor) {
      neighbor.cell.isAlive(function (isAlive) {
        if (isAlive) {
          count++;
        }
      });
      return count;
    }, 0);
  }

  function dimensionRange(startCoordinates, endCoordinates, dimension) {
    return us.range(startCoordinates[dimension], endCoordinates[dimension] + 1);
  }

  function coordinates(posX, posY, cell) {

    return {
      x: posX,
      y: posY,
      cell: cell,
      nextLife: function (allCoordinates, action) {
        cell.nextLife(this.neighbors(allCoordinates), function (cell) {
          action(cell);
        });
      },
      hasSameLocationAs: function (compareCoordinates) {
        return this.x === compareCoordinates.x && this.y === compareCoordinates.y;
      },
      atDifferentLocationThan: function (compareCoordinates) {
        return !this.hasSameLocationAs(compareCoordinates);
      },
      neighbors: function (possibleNeighbors) {
        var filter = neighborsFilter(this, neighborRangeFor(this, 'x'), neighborRangeFor(this, 'y'));
        var neighbors = us.filter(possibleNeighbors, filter);
        return {
          numberAlive: function () {
            return countLiveCellsIn(neighbors);
          }
        };
      },
      forEachNeighbor: function (action) {
        var me = this;
        us.each(neighborRangeFor(me, 'x'), function (x) {
          us.each(neighborRangeFor(me, 'y'), function (y) {
            if (me.atDifferentLocationThan({x: x, y: y})) {
              action(x, y);
            }
          });
        });
      }
    };
  }

  coordinates.coordinatesIterator = function (startCoordinates, endCoordinates) {
    return function (coordinateAction, rowAction) {
      us.each(dimensionRange(startCoordinates, endCoordinates, 'y'), function (pattern, yIndex) {
        us.each(dimensionRange(startCoordinates, endCoordinates, 'x'), function (pattern, xIndex) {
          coordinateAction(xIndex, yIndex);
        });
        rowAction();
      });
    };
  };

  module.exports = coordinates;
}());