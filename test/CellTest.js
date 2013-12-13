var assert = require("assert");
var cell = require("cell.js").cell;

describe('environment', function () {
    it('should be working', function () {
        var deadCell = cell();
        assert.equal('dead', deadCell.state());
    });
});