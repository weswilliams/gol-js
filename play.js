"use strict";
var world = require("./world.js");
var us = require("underscore");

var spinners =
  "\n" +
  "010000111001100\n" +
  "0100011100011\n" +
  "010000000000011\n" +
  "000000000000011";

var gliderGun =
  "00000000000000000000000001\n" +
  "00000000000000000000000101\n" +
  "0000000000000110000001100000000000011\n" +
  "0000000000001000100001100000000000011\n" +
  "01100000000100000100011\n" +
  "01100000000100010110000101\n" +
  "00000000000100000100000001\n" +
  "00000000000010001\n" +
  "000000000000011";

var game = world(gliderGun);
var exec = require('child_process').exec;
var util = require("util");

var width = process.argv[2];
var height = process.argv[3];
console.log("screen is " + width + "x" + height);

function clear() {
  us.each(us.range(0,width), function() {
    us.each(us.range(0,height), function(){
      util.print(" ");
    });
  });
}

setInterval(function(){
  clear();
  game.nextLife();
  var pattern = game.patternFor(
    {x:0,y:0}, {x:width-1,y:height-1},"X", " ");
  util.puts(pattern);
},150);