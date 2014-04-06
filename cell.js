(function () {
  "use strict";

  var us = require("underscore");

  function coordinates(posX, posY, cell) {
    return {
      x: posX,
      y: posY,
      isAlive: function () { return cell.isAlive(); },
      aliveInNextLife: function (neighbors) {
        return cell.aliveInNextLife(neighbors);
      },
      hasSameLocationAs: function (compareCoordinates) {
        return this.x === compareCoordinates.x && this.y === compareCoordinates.y;
      },
      neighbors: function(coordinates) {
        var me = this;
        var neighborXRange = us.range(me.x - 1, me.x + 2);
        var neighborYRange = us.range(me.y - 1, me.y + 2);
        function and(predicates, parameters) {
          return us.reduce(predicates, function(decision, predicate) {
            return decision && predicate(parameters);
          }, true);
        }
        function isXNeighbor(possibleNeighbor) {
          return us.contains(neighborXRange, possibleNeighbor.x);
        }
        function isYNeighbor(possibleNeighbor) {
          return us.contains(neighborYRange, possibleNeighbor.y);
        }
        function isNotMe(possibleNeighbor) {
          return !me.hasSameLocationAs(possibleNeighbor);
        }
        function isNeighbor(possibleNeighbor) {
          return and([isNotMe, isXNeighbor, isYNeighbor], possibleNeighbor);
        }
        var neighbors = us.filter(coordinates, isNeighbor);

        return {
          numberAlive: function() {
            return us.filter(neighbors, function(neighbor) {
              return neighbor.isAlive();
            }).length;
          }
        };
      }
    };
  }

  function liveCellAt() {
    return {
      isAlive: function () { return true; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 2 || neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs,
      neighbors: coordinates.neighbors
    };
  }

  function deadCellAt() {
    return {
      isAlive: function () { return false; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs,
      neighbors: coordinates.neighbors
    };
  }

  module.exports.cell = function (isAlive, posX, posY) {
    var cell;
    var myCoordinates = coordinates(posX, posY);
    if (isAlive) { cell = liveCellAt(myCoordinates); }
    else { cell = deadCellAt(myCoordinates); }
    return coordinates(posX, posY, cell);
  };
  module.exports.coordinates = coordinates;
  module.exports.deadCellAt = deadCellAt;
  module.exports.liveCellAt = liveCellAt;
})();