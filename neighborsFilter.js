(function () {
  "use strict";

  var us = require("underscore");

  function neighborsFilterFor(me, neighborXRange, neighborYRange) {

    function and(predicates, parameters) {
      return us.reduce(predicates, function (decision, predicate) {
        return decision && predicate(parameters);
      }, true);
    }

    function isXNeighbor(possibleNeighbor) {
      return us.contains(neighborXRange, possibleNeighbor.x);
    }

    function isYNeighbor(possibleNeighbor) {
      return us.contains(neighborYRange, possibleNeighbor.y);
    }

    function isNotMe(possibleNeighbor) {
      return me.atDifferentLocationThan(possibleNeighbor);
    }

    return function isNeighbor(possibleNeighbor) {
      return and([isNotMe, isXNeighbor, isYNeighbor], possibleNeighbor);
    };
  }

  module.exports = neighborsFilterFor;
}());