(function() {
  "use strict";

var us = require('underscore');
var cell = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    x: posX,
    y: posY,
    hasSameLocationAs: function(compareCell) {
      return this.x === compareCell.x && this.y === compareCell.y;
    }
  };
};
module.exports = cell;
})();