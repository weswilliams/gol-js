"use strict";
var assert = require("assert");
var should = require('should');
var liveCell = require("../cell.js").liveCell;
var deadCell = require("../cell.js").deadCell;
var coordinates = require("../cell.js").coordinates;

function coordinateWithCell(hasALiveCell, x, y) {
  var cell = hasALiveCell ? liveCell : deadCell;
  return coordinates(x, y, cell);
}

describe("coordinate system", function() {
  it('should have coordinates', function () {
    var coordinate0_0 = coordinates(0, 1);
    coordinate0_0.x.should.equal(0);
    coordinate0_0.y.should.equal(1);
  });
});

describe("neighbors", function(){
  it("should have no alive neighbors for a cell in a dead board", function() {
    var deadBoard = [];
    var myCoordinates = coordinateWithCell(false, 0, 0);
    myCoordinates.neighbors(deadBoard).numberAlive().should.equal(0);
  });

  it("should have live neighbors in same row for a cell", function() {
    var board = [coordinateWithCell(true, 0, 0), coordinateWithCell(false, 1, 0), coordinateWithCell(true, 2, 0)];
    var myCoordinates = coordinateWithCell(false, 1, 0);
    myCoordinates.neighbors(board).numberAlive().should.equal(2);
  });

  it("should have live neighbors in different row for a cell", function() {
    var board = [coordinateWithCell(true, 0, 0), coordinateWithCell(false, 1, 0), coordinateWithCell(true, 1, 1)];
    var myCoordinates = coordinateWithCell(false, 1, 0);
    myCoordinates.neighbors(board).numberAlive().should.equal(2);
  });

  it("should not count self as alive", function() {
    var board = [coordinateWithCell(true, 0, 0), coordinateWithCell(true, 1, 0), coordinateWithCell(true, 2, 0)];
    var myCoordinates = coordinateWithCell(true, 1, 0);
    myCoordinates.neighbors(board).numberAlive().should.equal(2);
  });

  it("should not count non-x neighbor as my live neighbor", function() {
    var board = [ coordinateWithCell(true, 0, 0), coordinateWithCell(true, 1, 0), coordinateWithCell(true, 2, 0) ];
    var myCoordinates = coordinateWithCell(true, 0, 0);
    myCoordinates.neighbors(board).numberAlive().should.equal(1);
  });

  it("should not count non-y neighbor as my live neighbor", function() {
    var board = [ coordinateWithCell(true, 0, 0), coordinateWithCell(true, 1, 0), coordinateWithCell(true, 1, 3) ];
    var myCoordinates = coordinateWithCell(true, 0, 0);
    myCoordinates.neighbors(board).numberAlive().should.equal(1);
  });
});