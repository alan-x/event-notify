import  EventQueue from './../../dist/index.min'
it('test Pack', () => {
    console.log(EventQueue)
    EventQueue.subscribe("111", function (data) {
        console.log("111:1 run",data)
    })
    EventQueue.run('111',{id:2})
});


