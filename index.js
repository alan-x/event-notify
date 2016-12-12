'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventQueue = require('./lib/EventQueue');

var _EventQueue2 = _interopRequireDefault(_EventQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _EventQueue2.default();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventManager = require("./EventManager");

var _EventManager2 = _interopRequireDefault(_EventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventHandleManager = function () {
    function EventHandleManager() {
        _classCallCheck(this, EventHandleManager);

        this.eventManager = new _EventManager2.default();
        this.eventHandleMap = new Map();
    }

    /**
     * 功能简介 : 获取事件句柄队列
     * 注意事项 : 无
     * 接受参数 : @param eventName 事件名称
     * 返回参数 : @returns 1. `eventName`不传,则返回所有事件句柄队列
     *                    2. `eventName`传,则返回该事件下的事件句柄队列
     * 流程说明 : 1. 判断参数是否有传
     *              - 如果`eventName===-1`则返回所有事件句柄队列
     *              - 如果`eventName!==-1`则返回该事件下的句柄队列
     * 调用示例 :
     *      ```
     *      getEventHandleMap('EVENT1')|
     *      getEventHandleMap()
     *      ```
     */


    _createClass(EventHandleManager, [{
        key: "getEventHandleMap",
        value: function getEventHandleMap() {
            var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

            if (eventName === -1) {
                return this.eventHandleMap;
            } else {
                return this.eventHandleMap.get(eventName);
            }
        }

        /**
         * 功能简介 : 添加一个事件到事件句柄队列
         * 注意事项 : 无
         * 接受参数 : @param eventName 事件名称
         *           @param event     事件发生时候的回调函数
         * 返回参数 : @returns 1. `event`不传,则返回`null`
         *                    2. `event`传,则返回该事件的句柄
         * 流程说明 : 1. 判断事件句柄队列中是否存在该事件
         *              - 存在:不做操作
         *              - 不存在:则在事件句柄队列中新建该事件
         *           2. 判断是否传输了事件回调函数
         *              - 是:将该回调函数添加到事件队列
         *              - 否:返回
         * 调用示例 :
         *      ```
         *      addEvent('EVENT1')|
         *      addEvent('EVENT1',function(){})
         *      ```
         */

    }, {
        key: "addEvent",
        value: function addEvent(eventName) {
            var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

            var events = this.getEventHandleMap(eventName);
            if (events === undefined) {
                this.eventHandleMap.set(eventName, []);
                events = this.getEventHandleMap(eventName);
            }

            if (event !== -1) {
                var uuid = this.eventManager.addEvent(event);
                events[events.length] = uuid;
                this.eventHandleMap.set(eventName, events);

                return uuid;
            }
            return null;
        }
        /**
         * 功能简介 : 从事件句柄队列移除一个事件
         * 注意事项 : 无
         * 接受参数 : @param eventName      事件名称
         *           @param eventHandle    事件句柄
         * 返回参数 : @returns null
         * 流程说明 : 1. 判断是否传输了`eventHandle`
         *              - 是 : 将该事件从事件队列中移除,再将该事件句柄从事件句柄队列中移除
         *              - 否 : 将该事件从事件句柄队列中移除
         *
         * 调用示例 :
         *      ```
         *      removeEvent('EVENT1','7634b1d2-711d-4ac2-81e9-0586823e0eab')|
         *      removeEvent('EVENT1')
         *      ```
         * TODO : 将事件直接从事件句柄队列移除的时候要讲事件函数从事件函数队列中移除,保持事件函数队列的干净,还没做
         */

    }, {
        key: "removeEvent",
        value: function removeEvent(eventName) {
            var eventHandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

            if (eventHandle !== -1) {
                this.eventManager.removeEvent(eventHandle);
                var eventMap = this.getEventHandleMap(eventName);
                for (var i = 0; i < eventMap.length; i++) {
                    if (eventMap[i] === eventHandle) {
                        eventMap.splice(i, 1);
                        return null;
                    }
                }
            } else {
                this.eventHandleMap.delete(eventName);
                return null;
            }
        }

        /**
         * 功能简介 : 运行某个事件
         * 注意事项 : 无
         * 接受参数 : @param eventName      事件名称
         * 返回参数 : @returns null
         * 流程说明 : 1. 获取该事件下所有的事件函数
         *              - 根据该事件下的所有事件的句柄从事件函数队列中获取到事件函数
         *           2. 执行
         *
         * 调用示例 :
         *      ```
         *      removeEvent('EVENT1','7634b1d2-711d-4ac2-81e9-0586823e0eab')|
         *      removeEvent('EVENT1')
         *      ```
         * TODO : 将事件直接从事件句柄队列移除的时候要讲事件函数从事件函数队列中移除,保持事件函数队列的干净,还没做
         */

    }, {
        key: "run",
        value: function run(eventName) {
            var events = this.getEventHandleMap(eventName);
            console.log("events", events);
            for (var i = 0; i < events.length; i++) {
                this.eventManager.run(events[i]);
            }
            return null;
        }
    }]);

    return EventHandleManager;
}();

exports.default = EventHandleManager;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = function () {
    function EventManager() {
        _classCallCheck(this, EventManager);

        this.eventMap = new Map();
    }

    /**
     * 功能简介 : 获取事件函数队列
     * 注意事项 : 无
     * 接受参数 : 无
     * 返回参数 : @returns eventMap 一个事件队列
     * 流程说明 : 1. 返回事件队列
     * 调用示例 :
     *      ```
     *      getEventMap()
     *      ```
     */


    _createClass(EventManager, [{
        key: "getEventMap",
        value: function getEventMap() {
            return this.eventMap;
        }

        /**
         * 功能简介 : 添加一个事件函数到事件回调队列
         * 注意事项 : 无
         * 接受参数 : @param event      事件回调
         * 返回参数 : @returns null
         * 流程说明 : 1. 生成一个事件句柄
         *              - 调用`uuid`生成一个事件句柄
         *           2. 将事件回调添加到事件回调队列
         *              - 将`uuid`作为`key`
         *              - 将事件回调作为`value`
         *
         * 调用示例 :
         *      ```
         *      addEvent(function(){})
         *      ```
         */

    }, {
        key: "addEvent",
        value: function addEvent(event) {
            var uuid = this.createUuid();
            this.eventMap.set(uuid, event);
            return uuid;
        }

        /**
         * 功能简介 : 从事件队列移除一个事件
         * 注意事项 : 无
         * 接受参数 : @param eventHandle    事件句柄
         * 返回参数 : @returns null
         * 流程说明 : 1. 根据事件句柄将事件回调从事件回调队列中删除
         *              - 从`eventMap`中删除`key==eventHandle`的项
         * 调用示例 :
         *      ```
         *      removeEvent('7634b1d2-711d-4ac2-81e9-0586823e0eab')
         *      ```
         * TODO : 将事件直接从事件句柄队列移除的时候要讲事件函数从事件函数队列中移除,保持事件函数队列的干净,还没做
         */

    }, {
        key: "removeEvent",
        value: function removeEvent(eventHandle) {
            this.eventMap.delete(eventHandle);
            console.log("eventMap" + this.eventMap);
            return null;
        }

        /**
         * 功能简介 : 运行事件回调
         * 注意事项 : 无
         * 接受参数 : @param eventHandle      事件句柄
         * 返回参数 : @returns null
         * 流程说明 : 1. 获取该事件句柄下的事件
         *              - 根据`eventHandle`从`eventMap`中找出该事件函数
         *           2. 执行
         *
         * 调用示例 :
         *      ```
         *      removeEvent('EVENT1','7634b1d2-711d-4ac2-81e9-0586823e0eab')|
         *      removeEvent('EVENT1')
         *      ```
         * TODO : 将事件直接从事件句柄队列移除的时候要讲事件函数从事件函数队列中移除,保持事件函数队列的干净,还没做
         */

    }, {
        key: "run",
        value: function run(eventHandle) {
            var event = this.eventMap.get(eventHandle);
            console.log(eventHandle, event);
            event();
            return null;
        }
        /**
         * 功能简介 : 生成一个uuid作为事件句柄
         * 注意事项 : 无
         * 接受参数 : 无
         * 返回参数 : @returns uuid 事件句柄
         * 流程说明 : 1. 生成事件句柄
         *
         * 调用示例 :
         *      ```
         *      createUuid()
         *      ```
         */

    }, {
        key: "createUuid",
        value: function createUuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        }
    }]);

    return EventManager;
}();

exports.default = EventManager;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventHandleManager = require('./EventHandleManager');

var _EventHandleManager2 = _interopRequireDefault(_EventHandleManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventQueue = function () {
    function EventQueue() {
        _classCallCheck(this, EventQueue);

        this.eventHandleManager = new _EventHandleManager2.default();
    }

    /**
     * 功能简介 : 发布一个事件,
     *           将一个事件加入到事件句柄队列,
     *           表明该事件接受订阅
     * 注意事项 : 该事件和`subscribe`|`run`方法没有调用冲突和先后顺序问题
     * 接受参数 : @param eventName 事件昵称
     * 返回结果 : @returns null
     * 流程说明 : 1. 将事件添加到事件句柄队列
     *              - 调用`eventHandlerManager.addEvent`将事件添加到句柄队列
     * 调用示例 :
     *      ```
     *      publish('EVENT1')
     *      ```
     */


    _createClass(EventQueue, [{
        key: 'publish',
        value: function publish(eventName) {
            this.eventHandleManager.addEvent(eventName);
            return null;
        }

        /**
         * 功能简介 : 订阅一个事件,如果这个事件还没发布也没有关系,
         *           将会自动调用`publish`方法自动发布一个事件,
         *           并将该事件句柄添加到事件句柄队列中,等待调用
         * 注意事项 : 该事件和`publish`|`run`方法没有调用冲突和先后顺序问题
         * 接受参数 : @param eventName       要调用的事件名称
         *           @param event           事件发生时的回调事件
         * 返回参数 : @returns eventHandle   事件在事件队列中的事件句柄,可以用来取消订阅
         * 流程说明 : 1. 将事件添加到事件句柄队列
         *              - 调用`eventHandlerManager.addEvent`将事件添加到句柄队列
         * 调用示例 :
         *      ```
         *      subscribe('EVENT1',function(){})
         *      ```
         */

    }, {
        key: 'subscribe',
        value: function subscribe(eventName, event) {
            return this.eventHandleManager.addEvent(eventName, event);
        }

        /**
         * 功能简介 : 用来提醒订阅者事件发生了,
         *           也就是调用订阅者订阅时的回调事件
         * 注意事项 : 该事件和`subscribe`|`publish`方法没有调用冲突和先后顺序问题
         * 接受参数 : @param eventName 要发生的事件名称
         * 返回参数 : @returns null
         * 流程说明 : 1. 运行该事件下的所有订阅者事件回调
         *              - 调用`eventHandlerManager.run`运行该事件下的所有订阅者事件回调
         * 调用示例 :
         *      ```
         *      run('EVENT1')
         *      ```
         */

    }, {
        key: 'run',
        value: function run(eventName) {
            this.eventHandleManager.run(eventName);
            return null;
        }

        /**
         * 功能简介 : 用来取消已经订阅的事件
         * 注意事项 : 该事件和`subscribe`|`publish`方法没有调用冲突和先后顺序问题
         *           也就是调用订阅者订阅时的回调事件
         * 接受参数 : @param eventName       要调用的事件名称
         *           @param eventHandle     事件发生时的回调事件句柄,如果该参数不传,将取消该事件下的所有订阅者
         * 返回参数 : @returns null
         * 流程说明 : 1. 将该事件从事件句柄队列中移除
         *              - 调用`eventHandlerManager.removeEvent`移除该事件下的
         * 调用示例 :
         *      ```
         *      cancel('EVENT1','7634b1d2-711d-4ac2-81e9-0586823e0eab')
         *      ```
         */

    }, {
        key: 'cancel',
        value: function cancel(eventName) {
            var eventHandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

            this.eventHandleManager.removeEvent(eventName, eventHandle);
            return null;
        }
    }]);

    return EventQueue;
}();

exports.default = EventQueue;
