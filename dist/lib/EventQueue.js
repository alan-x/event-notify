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
     *
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
         *           @param eventName
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
        value: function run(eventName, data) {
            this.eventHandleManager.run(eventName, data);
            return null;
        }

        /**
         * 功能简介 : 用来取消已经订阅的事件
         * 注意事项 : 该事件和`subscribe`|`publish`方法没有调用冲突和先后顺序问题
         *           也就是调用订阅者订阅时的回调事件
         * 接受参数 : @param eventName       要调用的事件名称
         *           @param eventName
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