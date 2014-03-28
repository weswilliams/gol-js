(function() {
  "use strict";
  var us = require("underscore");
  module.exports = function(cell, board) {
    var neighborXRange = us.range(cell.x - 1, cell.x + 2);
    var neighborYRange = us.range(cell.y - 1, cell.y + 2);
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
      return !cell.isEqual(possibleNeighbor);
    }
    function isNeighbor(possibleNeighbor) {
      return and([isNotMe, isXNeighbor, isYNeighbor], possibleNeighbor);
    }
    var neighbors = us.filter(board, isNeighbor);

    return {
      numberAlive: function() {
        return us.filter(neighbors, function(neighbor) {
          return neighbor.state();
        }).length;
      },
      all: function() {
        return neighbors;
      }
    }
  };
})();