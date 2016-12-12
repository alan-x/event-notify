// import EventHandleManager from 'EventHandleManager'
import EventHandleManager from '../src/lib/EventHandleManager'

it('event handle add|get|remove', () => {

    let ehm = new EventHandleManager()
    ehm.addEvent("1", function () {
        console.log('1:1')
    })
    ehm.addEvent("1", function () {
        console.log("1:2")
    })
    ehm.addEvent("2", "1")
    ehm.addEvent("2", "2")
    console.log(ehm.getEventHandleMap())

    ehm.removeEvent('2', '1')
    console.log(ehm.getEventHandleMap())

    ehm.removeEvent('2')
    console.log(ehm.getEventHandleMap())

    ehm.run('1')


});

