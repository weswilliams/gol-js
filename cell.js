(function () {
  "use strict";

  var us = require("underscore");

  function neighborsFilterFor(me) {
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
    return function isNeighbor(possibleNeighbor) {
      return and([isNotMe, isXNeighbor, isYNeighbor], possibleNeighbor);
    };
  }

  function coordinates(posX, posY, cell) {
    return {
      x: posX,
      y: posY,
      nextLife: function(coordinates, action) {
        cell.nextLife(this.neighbors(coordinates), function(cell) {
          action(cell);
        });
      },
      isAlive: function () { return cell.isAlive(); },
      hasSameLocationAs: function (compareCoordinates) {
        return this.x === compareCoordinates.x && this.y === compareCoordinates.y;
      },
      neighbors: function(possibleNeighbors) {
        var neighbors = us.filter(possibleNeighbors, neighborsFilterFor(this));
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

  function liveCellRules(neighbors) {
    return {
      staysAliveInNextLife: function() {
        return neighbors.numberAlive() === 2 || neighbors.numberAlive() === 3;
      }
    };
  }

  function liveCell() {
    return {
      isAlive: function () { return true; },
      aliveInNextLife: function (neighbors) {
        return liveCellRules(neighbors).staysAliveInNextLife();
      },
      nextLife: function(neighbors, action) {
        var nextLife = this.aliveInNextLife(neighbors) ? liveCell() : deadCell();
        action(nextLife);
      }
    };
  }

  function deadCellRules(neighbors) {
    return {
      comeAliveInNextLife: function() {
        return neighbors.numberAlive() === 3;
      }
    };
  }

  function deadCell() {
    return {
      isAlive: function () { return false; },
      aliveInNextLife: function (neighbors) {
        return deadCellRules(neighbors).comeAliveInNextLife();
      },
      nextLife: function(neighbors, action) {
        var nextLife = this.aliveInNextLife(neighbors) ? liveCell() : deadCell();
        action(nextLife);
      }
    };
  }

  module.exports.coordinates = coordinates;
  module.exports.deadCell = deadCell;
  module.exports.liveCell = liveCell;
})();