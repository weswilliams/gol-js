"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");

describe('cell', function () {

  var deadCell, liveCell;

  before(function() {
    deadCell = cell(false, 0, 1);
    liveCell = cell(true, 0, 1);
  });

  it('should have a state', function () {
    deadCell.state().should.equal(false);
  });

  it('should have coordinates', function () {
    deadCell.x.should.equal(0);
    deadCell.y.should.equal(1);
  });
});