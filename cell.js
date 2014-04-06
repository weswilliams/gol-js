(function () {
  "use strict";

  var us = require("underscore");

  function coordinates(posX, posY) {
    return {
      x: posX,
      y: posY,
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
              return neighbor.state();
            }).length;
          }
        };
      }
    };
  }

  function aliveCell(coordinates) {
    return {
      state: function () { return true; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 2 || neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs,
      neighbors: coordinates.neighbors
    };
  }

  function deadCell(coordinates) {
    return {
      state: function () { return false; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs,
      neighbors: coordinates.neighbors
    };
  }

  module.exports.cell = function (state, posX, posY) {
    var myCoordinates = coordinates(posX, posY);
    if (state) { return aliveCell(myCoordinates); }
    return deadCell(myCoordinates);
  };
})();