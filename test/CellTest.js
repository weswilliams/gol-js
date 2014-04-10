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

var nextLifeCell, liveCell, deadCell;
function isAliveAction(nextLife) { nextLifeCell = nextLife; }

beforeEach(function() {
  nextLifeCell = undefined;
  liveCell = cell.liveCell;
  deadCell = cell.deadCell;
});

describe('dead cell', function () {

  it('should stay dead with fewer than 3 live neighbors', function() {
    deadCell.nextLife(neighbors(2), isAliveAction);
    nextLifeCell.should.equal(deadCell);
  });

  it('should stay dead with more than 3 live neighbors', function() {
    deadCell.nextLife(neighbors(4), isAliveAction);
    nextLifeCell.should.equal(deadCell);
  });

  it('should come alive with exactly 3 live neighbors', function() {
    deadCell.nextLife(neighbors(3), isAliveAction);
    nextLifeCell.should.equal(liveCell);
  });

});

describe('alive cell', function () {

  it('should stay alive with exactly 2 live neighbors', function() {
    liveCell.nextLife(neighbors(2), isAliveAction);
    nextLifeCell.should.equal(liveCell);
  });

  it('should stay alive with exactly 3 live neighbors', function() {
    liveCell.nextLife(neighbors(3), isAliveAction);
    nextLifeCell.should.equal(liveCell);
  });

  it('should die with less than 2 live neighbors', function() {
    liveCell.nextLife(neighbors(1), isAliveAction);
    nextLifeCell.should.equal(deadCell);
  });

  it('should die with more than 3 live neighbors', function() {
    liveCell.nextLife(neighbors(4), isAliveAction);
    nextLifeCell.should.equal(deadCell);
  });

});
