"use strict";
var world = require("./world.js");
var parser = require("./patternparser.js");
var us = require("underscore");

var spinners =
  "\n" +
  "010000111001100\n" +
  "0100011100011\n" +
  "010000000000011\n" +
  "000000000000011";

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
function forEachX(isAlive) {
  pattern += isAlive ? "X" : " ";
}
function forEachY() {
  pattern += "\n";
}
setInterval(function(){
  clear();
  game.nextLife();
  pattern = "";
  game.patternFor({x:0,y:0}, {x:width-1,y:height-1},forEachX, forEachY);
  util.puts(pattern);
},gameSpeed);