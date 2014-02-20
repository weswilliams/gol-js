(function() {
  "use strict";

var us = require('underscore');
var cell = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    nextLife: function(neighbours) {
      var nextState = false;
      var numberLiveCells = neighbours.liveNeighbors();
      if (this.state() && numberLiveCells == 2) {
        nextState = true;
      }
      if (numberLiveCells == 3)
      {
        nextState = true;
      }
      return cell(nextState, this.x, this.y);
    },
    x: posX,
    y: posY
  };
};
module.exports = cell;
})();