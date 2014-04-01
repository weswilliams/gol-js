"use strict";

var world = require("../world.js");
var cell = require("../cell.js");
var us = require("underscore");

describe('world', function () {
  it("should handle an empty world", function () {
    world("").isAlive(0, 0).should.equal(false);
  });

  it('should parse a row pattern into cells', function () {
    var rowPattern = "010010";
    var newWorld = world(rowPattern);
    newWorld.isAlive(0, 0).should.equal(false);
    newWorld.isAlive(1, 0).should.equal(true);
  });

  it('should parse multiple rows pattern into cells', function () {
    var rowPattern = "010010\n000100";
    var newWorld = world(rowPattern);
    newWorld.isAlive(0, 0).should.equal(false);
    newWorld.isAlive(1, 0).should.equal(true);
    newWorld.isAlive(0, 1).should.equal(false);
  });


  it('should parse multiple rows pattern of unequal size into cells', function () {
    var rowPattern = "010010\n000100\n0001\n01\n01001";
    var newWorld = world(rowPattern);
    newWorld.isAlive(0, 0).should.equal(false);
    newWorld.isAlive(1, 0).should.equal(true);
    newWorld.isAlive(0, 1).should.equal(false);
    newWorld.isAlive(3, 2).should.equal(true);
    newWorld.isAlive(1, 4).should.equal(true);
  });

  it("should have a dead cell for cells not in the initial pattern", function () {
    var rowPattern = "010010\n000100";
    var newWorld = world(rowPattern);
    newWorld.isAlive(-1, -1).should.equal(false);
  });

  it("should handle the still life block", function () {
    var rowPattern = "0000\n0110\n0110\n0000";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}).should.equal(rowPattern);
  });

  it("should handle the game", function () {
    var rowPattern = "010\n010\n010";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:2,y:2}).should.equal(
      "000\n111\n000"
    );
  });

  it("should handle the 1st to 2nd glider pattern", function () {
    var rowPattern = "010\n001\n111";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}).should.equal(
      "0000\n1010\n0110\n0100"
    );
  });

  it("should handle the 2nd to 3rd glider pattern", function () {
    var rowPattern = "000\n101\n011\n010";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}).should.equal(
      "0000\n0010\n1010\n0110"
    );
  });

  it("should handle the 3rd to 4th glider pattern", function () {
    var rowPattern = "000\n001\n101\n011";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}).should.equal(
      "0000\n0100\n0011\n0110"
    );
  });

  it("should handle the 4th to 5th glider pattern", function () {
    var rowPattern = "0000\n0100\n0011\n0110";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:3,y:3}).should.equal(
      "0000\n0010\n0001\n0111"
    );
  });

  it("should handle the 5th to 6th glider pattern", function () {
    var rowPattern = "0000\n0010\n0001\n0111";
    var newWorld = world(rowPattern);
    newWorld.nextLife();
    newWorld.patternFor({x:0,y:0}, {x:4,y:4}).should.equal(
      "00000\n00000\n01010\n00110\n00100"
    );
  });
});
