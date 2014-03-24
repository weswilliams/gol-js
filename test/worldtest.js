"use strict";

var world = require("../world.js");
var cell = require("../cell.js");

describe('world', function() {
  it("should handle an empty world", function() {
    world("").find(0,0).state().should.equal(false);
  });

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

  it("should handle the still life block", function() {
    var rowPattern = "0000\n0110\n0110\n0000";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor(cell(false,0,0),cell(false,3,3)).should.equal(rowPattern);
  });

  it("should handle the blinker", function() {
    var rowPattern = "010\n010\n010";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor(cell(false,0,0),cell(false,2,2)).should.equal(
      "000\n111\n000"
    );
  });

  //do next
//  it("should handle the glider pattern", function() {
//    var rowPattern = "010\n001\n111";
//    var newWorld = world(rowPattern);
//    newWorld.nextLife();
//    newWorld.patternFor(cell(false,0,0),cell(false,3,3)).should.equal(
//      "0000\n1010\n0110\n0100"
//    );
//  });
});
