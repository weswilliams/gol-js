(function () {
  "use strict";

  function coordinates(posX, posY) {
    return {
      x: posX,
      y: posY,
      hasSameLocationAs: function (compareCoordinates) {
        return this.x === compareCoordinates.x && this.y === compareCoordinates.y;
      }
    }  ;
  }

  function aliveCell(coordinates) {
    return {
      state: function () { return true; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 2 || neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs
    };
  }

  function deadCell(coordinates) {
    return {
      state: function () { return false; },
      aliveInNextLife: function (neighbors) {
        return neighbors.numberAlive() === 3;
      },
      x: coordinates.x,
      y: coordinates.y,
      hasSameLocationAs: coordinates.hasSameLocationAs
    };
  }

  module.exports.cell = function (state, posX, posY) {
    var myCoordinates = coordinates(posX, posY);
    if (state) return aliveCell(myCoordinates);
    return deadCell(myCoordinates);
  };
})();