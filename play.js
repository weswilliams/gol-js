"use strict";
var world = require("./world.js");
var parser = require("./patternparser.js");
var us = require("underscore");

var exec = require('child_process').exec;
var util = require("util");

var width = process.argv[2] || 80;
var height = process.argv[3] || 24;
var patternName = process.argv[4] || "spinners";
var gameSpeed = process.argv[5] || 150;

console.log("screen is " + width + "x" + height);
console.log("pattern name is " + patternName);
var game = world();
parser(require("./" + patternName), function(x, y, isAlive) { game.addCellAt(x,y,isAlive); });

function clear() {
  us.each(us.range(0,width), function() {
    us.each(us.range(0,height), function(){
      util.print(" ");
    });
  });
}

var pattern;
var xLifeTypePrinters = {
  true: "X",
  false: " ",
  zombie: "*"
};

function forEachX(isAlive) {
  pattern += xLifeTypePrinters[isAlive];
}
function forEachY() {
  pattern += "\n";
}
setInterval(function(){
  clear();
  var adjustForStatusLine = 2;
  var adjustFor0Base = 1;
  game.nextLife();
  pattern = "";
  game.patternFor({x:0,y:0}, {x:width-adjustFor0Base,y:height-adjustFor0Base-adjustForStatusLine},
    forEachX, forEachY);
  util.print(pattern);
  util.print("life number: " + game.lifeCount());
},gameSpeed);