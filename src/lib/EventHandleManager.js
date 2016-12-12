import EventManager from './EventManager'

class EventHandleManager {
    constructor() {
        this.eventManager = new EventManager()
        this.eventHandleMap = new Map()
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
    getEventHandleMap(eventName = -1) {
        if (eventName === -1) {
            return this.eventHandleMap
        } else {
            return this.eventHandleMap.get(eventName)
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
    addEvent(eventName, event = -1) {
        let events = this.getEventHandleMap(eventName)
        if (events === undefined) {
            this.eventHandleMap.set(eventName, [])
            events = this.getEventHandleMap(eventName)
        }


        if (event !== -1) {
            let uuid = this.eventManager.addEvent(event)
            events[events.length] = uuid
            this.eventHandleMap.set(eventName, events)

            return uuid
        }
        return null

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
    removeEvent(eventName, eventHandle = -1) {
        if (eventHandle !== -1) {
            this.eventManager.removeEvent(eventHandle)
            let eventMap = this.getEventHandleMap(eventName)
            for (let i = 0; i < eventMap.length; i++) {
                if (eventMap[i] === eventHandle) {
                    eventMap.splice(i, 1)
                    return null
                }
            }
        } else {
            this.eventHandleMap.delete(eventName)
            return null
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
    run(eventName) {
        let events = this.getEventHandleMap(eventName)
        console.log("events", events)
        for (let i = 0; i < events.length; i++) {
            this.eventManager.run(events[i])
        }
        return null
    }
}

export default EventHandleManager