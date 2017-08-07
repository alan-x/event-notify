'use strict';

var _EventHandleManager = require('./../../src/lib/EventHandleManager');

var _EventHandleManager2 = _interopRequireDefault(_EventHandleManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('event handle add|get|remove', function () {

    var ehm = new _EventHandleManager2.default();
    ehm.addEvent("1", function () {
        console.log('1:1');
    });
    ehm.addEvent("1", function () {
        console.log("1:2");
    });
    ehm.addEvent("2", "1");
    ehm.addEvent("2", "2");
    console.log(ehm.getEventHandleMap());

    ehm.removeEvent('2', '1');
    console.log(ehm.getEventHandleMap());

    ehm.removeEvent('2');
    console.log(ehm.getEventHandleMap());

    ehm.run('1');
}); // import EventHandleManager from 'EventHandleManager'