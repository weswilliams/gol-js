"use strict";

var assert = require("assert");
var should = require('should');

describe("can perform an action later if object is used", function() {

  function delayedActionObject() {
    var valueCalc = function() { return 1; };
    return {
      value: function() {
        this.value = valueCalc();
        return this.value;
      },
      increment: function (callback) {
        var previousValue = valueCalc;
        valueCalc = function() {
          callback();
          return previousValue() + 1;
        };
        return this;
      }
    };
  }

  var called, obj;
  function callback() { called++; }

  beforeEach(function() {
    obj = delayedActionObject();
    called = 0;
  });

  it("should not perform action when object not used", function() {
   obj.increment(callback);
   called.should.equal(0);
  });

  it("should calculate latest value on access", function() {
    obj.increment(callback).increment(callback);
    obj.value().should.equal(3);
    called.should.equal(2);
  });
});