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

  it('should have a state', function () {
    var deadCell = cell(false);
    deadCell.state().should.equal(false);
  });

  it('should have coordinates', function () {
    var deadCell = cell(false, 0, 1);
    deadCell.x.should.equal(0);
    deadCell.y.should.equal(1);
  });

});