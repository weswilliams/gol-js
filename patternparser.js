(function () {
  "use strict";

  var us = require('underscore');

  function parseRowPattern(rowPattern, rowIndex, action) {
    us.each(rowPattern.split(''), function (cellState, columnIndex) {
      action(columnIndex, rowIndex, cellState === "1");
    });
  }

  function parseBoardPattern(boardPattern, action) {
    us.each(boardPattern.split('\n'), function(rowPattern, rowIndex) {
      parseRowPattern(rowPattern, rowIndex, action);
    });
  }

  module.exports = parseBoardPattern;
})();