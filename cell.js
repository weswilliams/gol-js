(function () {
  "use strict";

  function becomesZombie(neighbors) {
    return neighbors.numberOf(zombieCell) > 0 ? zombieCell : undefined;
  }

  var zombieCellRules = {
    aliveInNextLife: function (neighbors, action) {
      action(zombieCell);
    }
  };

  var liveCellRules = {
    livesOrDies: function(neighbors) {
      var numberLive = neighbors.numberOf(liveCell);
      return (numberLive === 2 || numberLive === 3) ?
        liveCell : deadCell;
    },
    aliveInNextLife: function (neighbors, action) {
      action(
        becomesZombie(neighbors) ||
        this.livesOrDies(neighbors));
    }
  };

  var deadCellRules = {
    comesAlive: function(neighbors) {
      return neighbors.numberOf(liveCell) === 3 ?
        liveCell : deadCell;
    },
    aliveInNextLife: function (neighbors, action) {
      action(
        this.comesAlive(neighbors));
    }
  };

  var cell = function (rules, name) {
    return module.exports[name] = {
      name: name,
      nextLife: function (neighbors, action) {
        return rules.aliveInNextLife(neighbors, function(nextLife) {
          action(nextLife);
        });
      }
    };
  };

  var liveCell = cell(liveCellRules, "liveCell");
  var deadCell = cell(deadCellRules, "deadCell");
  var zombieCell = cell(zombieCellRules, "zombieCell");

  module.exports.instance = function(json) {
    return this[ JSON.parse(json).name ];
  };
})();