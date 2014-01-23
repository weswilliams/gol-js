"use strict";
var assert = require("assert");
var should = require('should');
var cell = require("cell.js").cell;

describe('environment', function () {
  it('should be working', function () {
    var deadCell = cell('dead');
    deadCell.state().should.equal('dead');
  });
});