import EventQueue from '../src/EventQueue'
it('EventQueue pubish|subscribe|run', () => {
    EventQueue.publish("111")
    let eventHandler= EventQueue.subscribe("111", function () {
        console.log("111:1 run")
    })
    EventQueue.subscribe("111", function () {
        console.log("111:2 run")
    })
    EventQueue.run('111')
    EventQueue.cancel('111',eventHandler)
    console.log(EventQueue.eventHandleManager.getEventHandleMap())
    EventQueue.run('111')

});

