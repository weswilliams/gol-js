"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");
var neighbors = require("../neighbors.js");

describe("neighbors", function(){
  it("should have no alive neighbors for a cell in a dead board", function() {
    var deadBoard = [];
    var anyCell = cell(false, 0, 0);
    neighbors(anyCell, deadBoard).numberAlive().should.equal(0);
  });

  it("should have live neighbors in same row for a cell", function() {
    var board = [cell(true, 0, 0), cell(false, 1, 0), cell(true, 2, 0)];
    var myCell = cell(false, 1, 0);
    neighbors(myCell, board).numberAlive().should.equal(2);
  });

  it("should have live neighbors in different row for a cell", function() {
    var board = [cell(true, 0, 0), cell(false, 1, 0), cell(true, 1, 1)];
    var myCell = cell(false, 1, 0);
    neighbors(myCell, board).numberAlive().should.equal(2);
  });

  it("should not count self as alive", function() {
    var board = [cell(true, 0, 0), cell(true, 1, 0), cell(true, 2, 0)];
    var myCell = cell(true, 1, 0);
    neighbors(myCell, board).numberAlive().should.equal(2);
  });

  it("should not count non-x neighbor as my live neighbor", function() {
    var board = [ cell(true, 0, 0), cell(true, 1, 0), cell(true, 2, 0) ];
    var myCell = cell(true, 0, 0);
    neighbors(myCell, board).numberAlive().should.equal(1);
  });

  it("should not count non-y neighbor as my live neighbor", function() {
    var board = [ cell(true, 0, 0), cell(true, 1, 0), cell(true, 1, 3) ];
    var myCell = cell(true, 0, 0);
    neighbors(myCell, board).numberAlive().should.equal(1);
  });
});