import EventQueue from './../../src/lib/EventQueue'
it('EventQueue pubish|subscribe|run', () => {
    let event=new EventQueue();
    event.subscribe("111", function (data) {
        console.log("111:1 run",data)
    })
    event.subscribe("111", function (data) {
        console.log("111:2 run",data)
    })
    event.run('111',{id:1})
    event.run('111',{id:2})

});

