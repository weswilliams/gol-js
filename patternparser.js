(function () {
  "use strict";

  var us = require('underscore');
  var cellModule = require("./cell.js");

  function parseRowPattern(rowPattern, rowIndex, action) {
    us.each(rowPattern.split(''), function (cellState, columnIndex) {
      var cell = (cellState === "1" ? cellModule.liveCell : cellModule.deadCell);
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