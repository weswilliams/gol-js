(function() {
  "use strict";

  var us = require("underscore");
  var rules = [];
  rules.push(function(cell, neighbors) {
    return cell.state() && neighbors.numberAlive() === 2;
  });
  rules.push(function(cell, neighbors) {
    return neighbors.numberAlive() === 3;
  });
  module.exports = {
      nextLife: function(cell, neighbors)
      {
        return us.reduce(rules, function(nextState, rule) {
          return nextState || rule(cell, neighbors);
        }, false);
      }
    };
})();