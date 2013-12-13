var assert = require("assert");
var cell = require("cell.js").cell;

describe('cell', function() {
    describe('state', function(){
        it('should return be dead by default', function() {
            var deadCell = cell();
            assert.equal('dead', deadCell.state());
        });
    });
});