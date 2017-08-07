'use strict';

var _EventManager = require('./../../src/lib/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('event add|get|remove', function () {
    var em = new _EventManager2.default();
    var uuid = em.addEvent('1');
    // em.addEvent('1')
    // em.addEvent('1')
    // em.addEvent('1')

    console.log(em.getEventMap());
    em.removeEvent(uuid);
    console.log(em.getEventMap());
});