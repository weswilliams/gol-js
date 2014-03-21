(function () {
  "use strict";

  var us = require('underscore');
  var cell = require('./cell.js');

  function createCell(state, x, y) {
    return cell(state, x, y);
  }

  function parseRowPattern(rowPattern, rowIndex) {
    var rowCellStates = rowPattern.split('');
    return us.map(rowCellStates, function (cellState, columnIndex) {
      return createCell(cellState === "1", columnIndex, rowIndex);
    });
  }

  function parseBoardPattern(boardPattern) {
    return us.chain(boardPattern.split('\n'))
      .map(parseRowPattern).flatten().value();
  }

  module.exports = function (boardPattern) {
    var board = parseBoardPattern(boardPattern);
    return {
      find: function (x, y) {
        return us.find(board, function (cell) {
          return cell.x === x && cell.y === y;
        }) || cell(false, x, y);
      }
    }
  };
})();