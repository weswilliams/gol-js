"use strict";
define(function () {
  var canvas, drawingContext, cellSize = 10, gridSize = 25;

  function createCanvas() {
    console.log("create canvas");
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
  }

  function resizeCanvas() {
    console.log("resize canvas");
    canvas.height = cellSize * gridSize;
    canvas.width = cellSize * gridSize;
  }

  function createDrawingContext() {
    console.log("create drawingContext");
    drawingContext = canvas.getContext('2d');
  }

  function clearCoordinate(coordinate) {
    var x = coordinate.x * cellSize;
    var y = coordinate.y * cellSize;
    drawingContext.strokeStyle = 'rgba(242, 198, 65, 0.1)';
    drawingContext.strokeRect(x, y, cellSize, cellSize);
    drawingContext.fillStyle = 'rgb(38, 38, 38)';
    drawingContext.fillRect(x, y, cellSize, cellSize);
  }

  function clearBoard() {
    console.log("clear board");
    var x = 0, y = 0;
    while(y < gridSize) {
      x = 0;
      while(x < gridSize) {
        clearCoordinate({x: x, y: y});
        x++;
      }
      y++;
    }
  }

  createCanvas();
  resizeCanvas();
  createDrawingContext();
  clearBoard();

});