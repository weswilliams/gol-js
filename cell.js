(function() {
  "use strict";

var us = require('underscore');
module.exports = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    },
    x: posX,
    y: posY
  };
};
})();