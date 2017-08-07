'use strict';

var _index = require('./../../dist/index.min');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('test Pack', function () {
    console.log(_index2.default);
    _index2.default.subscribe("111", function (data) {
        console.log("111:1 run", data);
    });
    _index2.default.run('111', { id: 2 });
});