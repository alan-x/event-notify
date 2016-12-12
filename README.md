### react-component-event-queue 基于发布订阅模式的事件通知方式在react上的实践
---
> 这是一个基于发布订阅模式的消息队列框架,可用于`react`做组件间的事件通知.最好是没有任何关系并且不存在数据交互的事件通知,因为有数据的事件通知将会导致数据流的混乱.当然用于有数据传输的事件通知也没有什么不可,这个小框架也是具备这个功能的,哈哈!!

1. API列表
    - `publish(eventName)`:发布一个事件
        > 用来发布一个事件,如果事件已经存在,则不再发布,如果事件不存在,则发布.
    - `subscribe(eventName, event) `:订阅一个事件
        > 用来订阅一个事件,不可重复调用,会导致绑定多个事件
    - `run(eventName)`:触发一个事件到所有的订阅者
        > 事件发生时用来通知订阅者,会执行订阅时传入的回调函数
    - `cancel(eventName, eventHandle)`:取消一个事件(取消订阅)
        > 用来取消订阅的事件,如果eventHandle不传,将会把整个事件删除

2. 框架说明
    - UML图
     ![UML](https://github.com/followWinter/react-component-event-queue/raw/master/public/img/event-queue-uml.png)
      - `EventQueue`:事件队列管理类
      - `EventHandleManager`:事件句柄管理类
      - `EventManager`: 事件回调管理类
    - 框架运行原理
      队列管理图:
           ![map](https://github.com/followWinter/react-component-event-queue/raw/master/public/img/event-queue-map.png)
           
      该框架在运行时一直维护着两个队列,说是队列,其实是两个`Map`,一个是`eventMap`,称之为事件回调队列,一个是`eventHandleMap`,称之为事件句柄队列.
        - `eventMap`:
        由`EventManager`管理.
        该`map`中每一项都是`key=>value`格式.
        其中`key`为自动生成的不重复的`uuid`,用来做该回调时间的唯一`key`值,可以通过该`key`直接找到该回调事件.
        `value`为函数,回调函数,订阅者订阅事件的时候传入
        - `eventHandleMap`:
        由`EventHandleManager`管理.
        该`map`中每一项都是`key=>value`格式.
        其中`key`值为用户自定义的函数名称,可用于订阅者订阅该事件.
        `value`为一个数组,包含多个在eventMap中的`key`,可以通过`value`在`eventMap`中找到事件回调函数
    
    - 流程说明:
        - 订阅流程:
           1. 组件1调用`EventQueue.publish('EVENT1')`,发布一个事件,此时`EventHandleManage`将会在`eventHandleMap`中添加一个事件句柄,此时该队列中的数据为{'EVENT1'=>[]}
           2. 组件2调用`EventQueue.subscribe('EVENT1',function(){})`订阅`EVENT1`,此时`EventManager`将会在`eventMap`中添加一个事件回调函数,此时该队列中的数据为
           ```
           {'02469657-1765-4282-8288-9aac44edfb83'=>function(){}}
           ```
           
           接着`EventHandleMap`将会将该事件回调函数的`key`,也就是句柄加入到`EVENT1`的事件句柄队列中,此时该队列的数据为
           ```
           {'EVENT1'=>['02469657-1765-4282-8288-9aac44edfb83']}
           ```
           3. 组件3调用`EventQueue.subscribe('EVENT1',function(){})`订阅`EVENT1`则`eventMap`中的数据为
           ```
           {'02469657-1765-4282-8288-9aac44edfb83'=>function(){},
           'f85bb99b-5717-4a48-9764-5879c72e5fac'=>function(){}}
           ```
           `eventHandleMap`中的数据为
           ```
           {'EVENT1'=>['02469657-1765-4282-8288-9aac44edfb83',
                       'f85bb99b-5717-4a48-9764-5879c72e5fac']}
           ```
           4. 如果这时候3中的组件调用的是`EventQueue.subscribe('EVENT2',function(){})`,注意此时`EVENT2`并未发布,但是并不会影响该程序运行,它将会自动发布该事件,此时`eventMap`中的数据为
           ```
           {'02469657-1765-4282-8288-9aac44edfb83'=>function(){},
            'f85bb99b-5717-4a48-9764-5879c72e5fac'=>function(){},
            '90543d90-759e-4c2d-8389-a4d6b49531d0'=>function(){}}
           ```
           ,`eventHandleMap`中的数据为
           ```
           {'EVENT1'=>['02469657-1765-4282-8288-9aac44edfb83',
                       'f85bb99b-5717-4a48-9764-5879c72e5fac'],
            'EVENT2'=>['90543d90-759e-4c2d-8389-a4d6b49531d0']}
           ```
           5. 当组件1调用`EventQueue.run('EVENT1')`,则`EventHandleManager`将会找出`key`为`EVENT1`中的句柄,同时根据句柄去`eventMap`中找到所有的事件毁掉函数并执行,这时候,所有订阅了该事件的订阅的将会执行他们订阅该事件时绑定的额回调函数.
           6. 当组件2或者3调用`EventQueue.cancle('Event1','02469657-1765-4282-8288-9aac44edfb83')`时,将会从`eventHandleMap`中删除掉`EVENT1`中`key=02469657-1765-4282-8288-9aac44edfb83`的记录,并从`eventMap`中将`key=02469657-1765-4282-8288-9aac44edfb83`的记录删除,以保持队列整洁.
           7. 当组件1调用`EventQueue.cancel('EVENT1)`时,将会从`eventHandleMap`将`key=EVENT1`的记录直接删除,从而所有的订阅者将无法订阅该事件,并且所有的事件回调函数将从`eventMap`中移除
3. 项目运行方式
    - `npm install` : 安装依赖包
    - `npm start` :  运行项目
    - `npm run test` : 运行单元测试
    - `npm run build` :打包项目
