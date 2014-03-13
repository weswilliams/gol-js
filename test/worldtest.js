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

});
