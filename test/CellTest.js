"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");

function neighbors(numberAlive) {
  return {
    numberAlive: function() {
      return numberAlive;
    }
  };
}

describe('dead cell', function () {

  var deadCell, comeAlive;
  function isAliveAction(alive) { comeAlive = alive; }

  before(function() {
    deadCell = cell.deadCell;
  });

  it('should stay dead with fewer than 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(2), isAliveAction);
    comeAlive.should.equal(false);
  });

  it('should stay dead with more than 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(4), isAliveAction);
    comeAlive.should.equal(false);
  });

  it('should come alive with exactly 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(3), isAliveAction);
    comeAlive.should.equal(true);
  });

});

describe('alive cell', function () {

  var aliveCell, isStillAlive;
  function stayAliveAction(alive) { isStillAlive = alive; }

  before(function() {
    aliveCell = cell.liveCell;
  });

  it('should stay alive with exactly 2 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(2), stayAliveAction);
    isStillAlive.should.equal(true);
  });

  it('should stay alive with exactly 3 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(3), stayAliveAction);
    isStillAlive.should.equal(true);
  });

  it('should die with less than 2 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(1), stayAliveAction);
    isStillAlive.should.equal(false);
  });

  it('should die with more than 3 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(4), stayAliveAction);
    isStillAlive.should.equal(false);
  });

});
