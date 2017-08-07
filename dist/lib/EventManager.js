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
            var uuid = EventManager.createUuid();
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
            return null;
        }

        /**
         * 功能简介 : 运行事件回调
         * 注意事项 : 无
         * 接受参数 : @param eventHandle      事件句柄
         *          @param data     事件发生携带的参数
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
        value: function run(eventHandle, data) {
            var event = this.eventMap.get(eventHandle);
            event(data);
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

    }], [{
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