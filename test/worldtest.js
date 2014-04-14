"use strict";

var world = require("../world.js");
var parser = require("../patternparser.js");
var liveCell = require("../cell.js").liveCell;
var deadCell = require("../cell.js").deadCell;
var zombieCell = require("../cell.js").zombieCell;

liveCell.testPattern = "1";
deadCell.testPattern = "0";
zombieCell.testPattern = "!";

var pattern;
function onNewY() {
  pattern += "\n";
}
function onNewX(cell) {
  pattern += cell.testPattern;
}

describe('world', function () {

  beforeEach(function() {
    pattern = "";
  });

  it('should not be taken over by zombies', function() {
    var newWorld = world();
    newWorld.addCellAt(1,1, liveCell);
    newWorld.addCellAt(2,1, zombieCell);
    newWorld.nextLife();
    newWorld.patternFor({x: 1, y: 0}, {x: 3, y: 2}, onNewX, onNewY);
    pattern.trim().should.equal("000\n!!0\n000");
  });

  it("should handle zombie cells", function() {
    var newWorld = world();
    newWorld.addCellAt(0,0,liveCell);
    newWorld.addCellAt(1,0,zombieCell);
    newWorld.nextLife();
    newWorld.patternFor({x: 0, y:0}, {x:1, y:0}, onNewX, onNewY);
    pattern.trim().should.equal("!!");
  });

  it("should build a list of live cells with neighbors", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,liveCell);
    newWorld.liveCellsAndNeighbors().length.should.equal(9);
  });

  it("should build a list of live cells with neighbors and no duplicate neighbors", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,liveCell);
    newWorld.addCellAt(3,1,liveCell);
    newWorld.liveCellsAndNeighbors().length.should.equal(1 + 1 + 8 + 5);
  });

  it("should build a list of live cells with neighbors and no duplicate live cells", function() {
    var newWorld = world();
    newWorld.addCellAt(1,1,liveCell);
    newWorld.addCellAt(2,1,liveCell);
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

  it("should parse unknown character to dead cell", function() {
    var newWorld = world();
    parser("?", function(x,y,isAlive) { newWorld.addCellAt(x,y,isAlive); });
    newWorld.patternFor({x:0,y:0}, {x:0,y:0}, onNewX, onNewY);
    pattern.trim().should.equal("0");
  });

});
