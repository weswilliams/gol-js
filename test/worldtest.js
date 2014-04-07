"use strict";

var world = require("../world.js");
var parser = require("../patternparser.js");

var pattern;
function onNewY() {
  pattern += "\n";
}
function onNewX(isAlive) {
  pattern += isAlive ? "1" : "0";
}

describe('world', function () {

  beforeEach(function() {
    pattern = "";
  });

  it("should build a list of live cells with neighbors", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,true);
    newWorld.liveCellsAndNeighbors().length.should.equal(9);
  });

  it("should build a list of live cells with neighbors and no duplicate neighbors", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,true);
    newWorld.addCellAt(3,1,true);
    newWorld.liveCellsAndNeighbors().length.should.equal(1 + 1 + 8 + 5);
  });

  it("should build a list of live cells with neighbors and no duplicate live cells", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,true);
    newWorld.addCellAt(2,1,true);
    newWorld.liveCellsAndNeighbors().length.should.equal(1 + 1 + 7 + 3);
  });

  it("should handle the still life block", function () {
    var newWorld = world();
    parser("0000\n0110\n0110\n0000", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}, onNewX, onNewY);
    pattern.trim().should.equal("0000\n0110\n0110\n0000");
  });

  it("should handle the game", function () {
    var newWorld = world();
    parser("010\n010\n010", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:2,y:2}, onNewX, onNewY);
    pattern.trim().should.equal("000\n111\n000");
  });

  it("should handle the 1st to 2nd glider pattern", function () {
    var newWorld = world();
    parser("010\n001\n111", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}, onNewX, onNewY);
    pattern.trim().should.equal("0000\n1010\n0110\n0100");
  });

  it("should handle the 2nd to 3rd glider pattern", function () {
    var newWorld = world();
    parser("000\n101\n011\n010", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}, onNewX, onNewY);
    pattern.trim().should.equal("0000\n0010\n1010\n0110");
  });

  it("should handle the 3rd to 4th glider pattern", function () {
    var newWorld = world();
    parser("000\n001\n101\n011", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}, onNewX, onNewY);
    pattern.trim().should.equal("0000\n0100\n0011\n0110");
  });

  it("should handle the 4th to 5th glider pattern", function () {
    var newWorld = world();
    parser("0000\n0100\n0011\n0110", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}, onNewX, onNewY);
    pattern.trim().should.equal("0000\n0010\n0001\n0111");
  });

  it("should handle the 5th to 6th glider pattern", function () {
    var newWorld = world();
    parser("0000\n0010\n0001\n0111", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:4,y:4}, onNewX, onNewY);
    pattern.trim().should.equal("00000\n00000\n01010\n00110\n00100");
  });
});
