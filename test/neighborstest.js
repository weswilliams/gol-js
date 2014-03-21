"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");
var neighbors = require("../neighbors.js");

describe("neighbors", function(){
  it("should show number of alive neighbors for a cell", function() {
    var board = [];
    var anyCell = cell(false, 0, 0);
    neighbors(anyCell, board).numberAlive().should.equal(0);
  });
});