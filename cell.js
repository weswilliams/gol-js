(function () {
  "use strict";

  var zombieCellRules = {
    aliveInNextLife: function (neighbors, action) {
      action("zombie");
    }
  };

  var liveCellRules = {
    aliveInNextLife: function (neighbors, action) {
      var numberLive = neighbors.numberOf(liveCell);
      var stayAlive = numberLive === 2 || numberLive === 3;
      stayAlive = neighbors.numberOf(zombieCell) === 1 ? "zombie" : stayAlive;
      action(stayAlive);
      return  stayAlive;
    }
  };

  var deadCellRules = {
    aliveInNextLife: function (neighbors, action) {
      var comesAlive = neighbors.numberOf(liveCell) === 3;
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
  var zombieCell = cell(zombieCellRules, true);

  var nextLifeCell = {
    true: liveCell,
    false: deadCell,
    zombie: zombieCell
  };

  module.exports.deadCell = deadCell;
  module.exports.liveCell = liveCell;
  module.exports.zombieCell = zombieCell;
})();