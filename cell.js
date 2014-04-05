(function() {
  "use strict";
var rules = require('./rules');

module.exports = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    x: posX,
    y: posY,
    aliveInNextLife: function(neighbors) {
      return rules.nextLife(this, neighbors);
    },
    hasSameLocationAs: function(compareCell) {
      return this.x === compareCell.x && this.y === compareCell.y;
    }
  };
};
})();