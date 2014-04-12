(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require("./cell.js");
  var cellStringToType = {
    cellType: function(cellString, action) {
      if (this.hasOwnProperty(cellString)) {
        action(this[cellString]);
      } else {
        console.log("Invalid cell string in pattern: " + cellString);
        action(cellModule.deadCell);
      }
    },
    "1": cellModule.liveCell,
    "0": cellModule.deadCell,
    "!": cellModule.zombieCell
  };

  function parseRowPattern(rowPattern, rowIndex, action) {
    us.each(rowPattern.split(''), function (cellState, columnIndex) {
      cellStringToType.cellType(cellState, function(cell) {
        action(columnIndex, rowIndex, cell);
      });
    });
  }

  function parseBoardPattern(boardPattern, action) {
    us.each(boardPattern.split('\n'), function(rowPattern, rowIndex) {
      parseRowPattern(rowPattern, rowIndex, action);
    });
  }

  module.exports = parseBoardPattern;
})();