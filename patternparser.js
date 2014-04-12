(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require("./cell.js");

  function parseRowPattern(rowPattern, rowIndex, action) {
    us.each(rowPattern.split(''), function (cellState, columnIndex) {
      var cell;
      switch (cellState) {
        case "1": cell = cellModule.liveCell; break;
        case "!": cell = cellModule.zombieCell; break;
        case "0": default: cell = cellModule.deadCell; break;
      }
      action(columnIndex, rowIndex, cell);
    });
  }

  function parseBoardPattern(boardPattern, action) {
    us.each(boardPattern.split('\n'), function(rowPattern, rowIndex) {
      parseRowPattern(rowPattern, rowIndex, action);
    });
  }

  module.exports = parseBoardPattern;
})();