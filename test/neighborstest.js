"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");
var neighbors = require("../neighbors.js");
var us = require("underscore");

describe("neighbors", function(){
  it("should have no alive neighbors for a cell in a dead board", function() {
    var deadBoard = [];
    var anyCell = cell(false, 0, 0);
    neighbors(anyCell, deadBoard).numberAlive().should.equal(0);
  });

  it("should have live neighbors for a cell", function() {
    var board = [cell(true, 0, 0), cell(false, 1, 0), cell(true, 2, 0)];
    var myCell = cell(false, 1, 0);
    neighbors(myCell, board).numberAlive().should.equal(2);
  });

  it("should not count self as alive", function() {
    var board = [cell(true, 0, 0), cell(true, 1, 0), cell(true, 2, 0)];
    var myCell = cell(true, 1, 0);
    neighbors(myCell, board).numberAlive().should.equal(2);
  });
});