(function() {
    "use strict";

    var us = require('underscore');

    module.exports = function(cells) {
        return {
            live_cells: function() {
                return us(cells).filter(function(cell) { return cell.state(); });
            }
        };
    };
})();