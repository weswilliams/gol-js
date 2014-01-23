"use strict";
module.exports = function(state, posX, posY) {
  return {
    state: function() {
      return state;
    }
    , x: posX
    , y: posY
  };
};