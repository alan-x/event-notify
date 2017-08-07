'use strict';

var _EventQueue = require('./../../src/lib/EventQueue');

var _EventQueue2 = _interopRequireDefault(_EventQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('EventQueue pubish|subscribe|run', function () {
    var event = new _EventQueue2.default();
    event.subscribe("111", function (data) {
        console.log("111:1 run", data);
    });
    event.subscribe("111", function (data) {
        console.log("111:2 run", data);
    });
    event.run('111', { id: 1 });
    event.run('111', { id: 2 });
});