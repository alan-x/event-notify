import EventManager from '../src/lib/EventManager'

it('event add|get|remove', () => {
    let em = new EventManager()
    let uuid= em.addEvent('1')
    // em.addEvent('1')
    // em.addEvent('1')
    // em.addEvent('1')

    console.log(em.getEventMap())
    em.removeEvent(uuid)
    console.log(em.getEventMap())
});

