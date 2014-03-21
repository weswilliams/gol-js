"use strict";

var world = require("../world.js");
var cell = require("../cell.js");
var us = require('underscore');

describe('world', function() {
  it('should parse a row pattern into cells', function() {
    var rowPattern = "010010";
    var newWorld = world(rowPattern);
    newWorld.find(0,0).state().should.equal(false);
    newWorld.find(1,0).state().should.equal(true);
  });

  it('should parse multiple rows pattern into cells', function() {
    var rowPattern = "010010\n000100";
    var newWorld = world(rowPattern);
    newWorld.find(0,0).state().should.equal(false);
    newWorld.find(1,0).state().should.equal(true);
    newWorld.find(0,1).state().should.equal(false);
  });


  it('should parse multiple rows pattern of unequal size into cells', function() {
    var rowPattern = "010010\n000100\n0001\n01\n01001";
    var newWorld = world(rowPattern);
    newWorld.find(0,0).state().should.equal(false);
    newWorld.find(1,0).state().should.equal(true);
    newWorld.find(0,1).state().should.equal(false);
    newWorld.find(3,2).state().should.equal(true);
    newWorld.find(1,4).state().should.equal(true);
  });

  it("should have a dead cell for cells not in the initial pattern", function() {
    var rowPattern = "010010\n000100";
    var newWorld = world(rowPattern);
    newWorld.find(-1,-1).state().should.equal(false);
  });
});
