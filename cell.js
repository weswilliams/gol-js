(function() {
  "use strict";

var us = require('underscore');
module.exports.cell = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    x: posX,
    y: posY
  };
};

module.exports.world = function(cells) {
  return {
    live_cells: function() {
      return us(cells).filter(function(cell) { return cell.state(); });
    }
  };
};
})();