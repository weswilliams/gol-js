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

  var deadCell;

  before(function() {
    deadCell = cell.deadCell();
  });

  it('should be dead', function () {
    deadCell.isAlive().should.equal(false);
  });

  it('should stay dead with fewer than 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(2)).should.equal(false);
  });

  it('should stay dead with more than 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(4)).should.equal(false);
  });

  it('should come alive with exactly 3 live neighbors', function() {
    deadCell.aliveInNextLife(neighbors(3)).should.equal(true);
  });

});

describe('alive cell', function () {

  var aliveCell;

  before(function() {
    aliveCell = cell.liveCell();
  });

  it('should be dead', function () {
    aliveCell.isAlive().should.equal(true);
  });

  it('should stay alive with exactly 2 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(2)).should.equal(true);
  });

  it('should stay alive with exactly 3 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(3)).should.equal(true);
  });

  it('should die with less than 2 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(1)).should.equal(false);
  });

  it('should die with more than 3 live neighbors', function() {
    aliveCell.aliveInNextLife(neighbors(4)).should.equal(false);
  });

});
