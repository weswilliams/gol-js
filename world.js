(function () {
  "use strict";

  var us = require('underscore');
  var cell = require('./cell.js');

  module.exports = function (boardPattern) {
    var rows = boardPattern.split('\n');
    var board = us.map(rows, function (rowPattern, rowIndex) {
      var row = rowPattern.split('');
      return us.map(row, function (cellState, columnIndex) {
        return cell(cellState === "1", columnIndex, rowIndex);
      });
    });
    board = us.flatten(board);
    return {
      find: function (x, y) {
        return us.find(board, function (cell) {
          return cell.x === x && cell.y === y;
        }) || cell(false, x, y);
      }
    }
  };
})();