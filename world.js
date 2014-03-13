(function () {
  "use strict";

  var us = require('underscore');
  var cell = require('./cell.js');

  module.exports = function (rowPattern) {
    var row = rowPattern.split('');
    var rowIndex = 0;
    var board = us.map(row, function(cellState, columnIndex) {
      return cell(cellState === "1", columnIndex, rowIndex);
    });
    return {
      find: function (x, y) {
        return us.find(board, function(cell) {
          return cell.x === x && cell.y === y;
        });
      }
    }
  };
})();