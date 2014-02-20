"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");
var world = require("../world.js");

describe('world', function() {
  it('should have live cells', function() {
    world = world([cell(false, 0, 0), cell(true, 0, 1)]);
    world.live_cells().length.should.equal(1);
  });
});

describe('cell', function () {

  var deadCell, liveCell;

  before(function() {
    deadCell = cell(false, 0, 1);
    liveCell = cell(true, 0, 1);
  });

  var liveNeighbours = function(numberOfCells) {
    return {
      liveNeighbors: function () {
        return numberOfCells;
      }
    };
  };

  it('should have a state', function () {
    deadCell.state().should.equal(false);
  });

  it('should have coordinates', function () {
    deadCell.x.should.equal(0);
    deadCell.y.should.equal(1);
  });

  it('Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function(){
    liveCell.nextLife(liveNeighbours(0)).state().should.equal(false);
    liveCell.nextLife(liveNeighbours(1)).state().should.equal(false);
  });

  it('Any live cell with two live neighbours lives on to the next generation', function() {
    liveCell.nextLife(liveNeighbours(2)).state().should.equal(true);
  });

  it('Any live cell with three live neighbours lives on to the next generation', function() {
    liveCell.nextLife(liveNeighbours(3)).state().should.equal(true);
  });

  it('Any live cell with more than three live neighbours dies, as if by overcrowding.', function() {
    liveCell.nextLife(liveNeighbours(4)).state().should.equal(false);
  });

  it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function() {
    deadCell.nextLife(liveNeighbours(3)).state().should.equal(true);
  });

  it('Any dead cell with exactly two live neighbours stays dead', function() {
    deadCell.nextLife(liveNeighbours(2)).state().should.equal(false);
  });
});