"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("cell.js");

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