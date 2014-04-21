'use strict';
define(function () {
  var canvas, drawingContext, cellSize = 10, gridSize = 50;

  function createCanvas() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
  }

  function resizeCanvas() {
    canvas.height = cellSize * gridSize;
    canvas.width = cellSize * gridSize;
  }

  function createDrawingContext() {
    drawingContext = canvas.getContext('2d');
  }

  function drawAtCoordinate(coordinate, fillStyle) {
    var x = coordinate.x * cellSize;
    var y = coordinate.y * cellSize;
    drawingContext.strokeStyle = 'rgba(242, 198, 65, 0.1)';
    drawingContext.strokeRect(x, y, cellSize, cellSize);
    drawingContext.fillStyle = fillStyle;
    drawingContext.fillRect(x, y, cellSize, cellSize);
  }

  function clearCoordinate(coordinate) {
    drawAtCoordinate(coordinate, 'rgb(38, 38, 38)');
  }

  function showCoordinate(coordinate) {
    drawAtCoordinate(coordinate, 'rgb(242, 198, 65)');
  }

  function clearBoard() {
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

  return function(liveCoordinates) {
    clearBoard();
    liveCoordinates.forEach(function(coordinate) {
      showCoordinate(coordinate);
    });
  };
});