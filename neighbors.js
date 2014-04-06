(function() {
  "use strict";
  var us = require("underscore");
  module.exports = function(cell, coordinates) {
    return cell.neighbors(coordinates);
  };
})();