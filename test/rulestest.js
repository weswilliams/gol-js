"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("../cell.js");
var rules = require("../rules.js");

var liveCell = cell(true, 0, 0);
var deadCell = cell(false, 0, 0);
function neighbors(numberAlive) {
  return {
    numberAlive: function (){
      return numberAlive;
    }
  }
}
describe("next life rules", function(){
  it("livecell with less than 2 live neighbours dies.", function() {
    rules.nextLife(liveCell, neighbors(0)).should.equal(false);
    rules.nextLife(liveCell, neighbors(1)).should.equal(false);
  });

  it("livecell with exactly 2 live neighbours lives.", function() {
    rules.nextLife(liveCell, neighbors(2)).should.equal(true);
  });

  it("livecell with exactly 3 live neighbours lives.", function() {
    rules.nextLife(liveCell, neighbors(3)).should.equal(true);
  });

  it("livecell with more than 3 live neighbours dies", function(){
    rules.nextLife(liveCell, neighbors(4)).should.equal(false);
    rules.nextLife(liveCell, neighbors(8)).should.equal(false);
  });

  it("deadcell with exactly 3 live neighbours becomes a live cell", function() {
    rules.nextLife(deadCell, neighbors(3)).should.equal(true);
  });

  it("deadcell with less than 3 live neighbours stays dead", function(){
    rules.nextLife(deadCell, neighbors(2)).should.equal(false);
    rules.nextLife(deadCell, neighbors(0)).should.equal(false);
  });

  it("deadcell with greater than 3 live neighbours stays dead", function(){
    rules.nextLife(deadCell, neighbors(4)).should.equal(false);
  });
});