"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");

function neighbors(numberAlive, zombies) {
  liveCell.numberOf = numberAlive;
  zombieCell.numberOf = zombies;
  deadCell.numberOf = 0;
  return {
    numberOf: function(cell) {
      return cell.numberOf;
    }
  };
}

var nextLifeCell, liveCell, deadCell, zombieCell;
function isAliveAction(nextLife) { nextLifeCell = nextLife; }

beforeEach(function() {
  nextLifeCell = undefined;
  liveCell = cell.liveCell;
  deadCell = cell.deadCell;
  zombieCell = cell.zombieCell;
});

describe('zombie cell', function() {

  it("should be able to JSONify", function() {
    cell.instance(JSON.stringify(zombieCell)).should.equal(zombieCell);
  });

  it('should not die even with no neighbors', function() {
    zombieCell.nextLife(neighbors(0), isAliveAction);
    nextLifeCell.should.equal(zombieCell);
  });
});

describe('dead cell', function () {

  it("should be able to JSONify", function() {
    cell.instance(JSON.stringify(deadCell)).should.equal(deadCell);
  });

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

  it("should be able to JSONify", function() {
    cell.instance(JSON.stringify(liveCell)).should.equal(liveCell);
  });

  it('should become a zombie with one zombie neighbor', function() {
    liveCell.nextLife(neighbors(0, 1), isAliveAction);
    nextLifeCell.should.equal(zombieCell);
  });

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
