(function() {
  "use strict";

var us = require('underscore');
var cell = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    x: posX,
    y: posY
  };
};
module.exports = cell;
})();