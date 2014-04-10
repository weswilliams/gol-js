(function () {
  "use strict";

  var liveCellRules = {
    aliveInNextLife: function (neighbors, action) {
      var stayAlive = neighbors.numberAlive() === 2 || neighbors.numberAlive() === 3;
      if (action) {
        action(stayAlive);
      }
      return  stayAlive;
    }
  };

  var deadCellRules = {
    aliveInNextLife: function (neighbors, action) {
      var comesAlive = neighbors.numberAlive() === 3;
      if (action) {
        action(comesAlive);
      }
    }
  };

  var cell = function (rules, isAlive) {
    return {
      isAlive: function (action) {
        if (action) {
          action(isAlive);
        }
      },
      nextLife: function (neighbors, action) {
        return rules.aliveInNextLife(neighbors, function(isAlive) {
          action(nextLifeCell[isAlive]);
        });
      }
    };
  };

  var liveCell = cell(liveCellRules, true);
  var deadCell = cell(deadCellRules, false);

  var nextLifeCell = {
    true: liveCell,
    false: deadCell
  };

  module.exports.deadCell = deadCell;
  module.exports.liveCell = liveCell;
})();