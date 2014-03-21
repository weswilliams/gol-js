(function() {
  "use strict";
  var us = require("underscore");
  module.exports = function(cell, board) {
    return {
      numberAlive: function() {
        return us.filter(board, function(possibleNeighbor) {
          return possibleNeighbor.state() && !cell.isEqual(possibleNeighbor);
        }).length;
      }
    }
  };
})();