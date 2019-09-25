function Events(){
    this._events = {};
}

Events.prototype.on =  function(type, fn){
    if(this._events[type]){
        this._events[type].push(fn);
    } else {
        this._events[type] = [fn];
    }
}

Events.prototype.emit = function(){
    let type = Array.prototype.shift.call(arguments);
    let arr = this._events[type];
    arr.forEach(element => {
        element(...arguments);
    });
}

// Test

let ev = new Events();
ev.on('read', function(title, author){
    console.log('我要订阅你的内容:', title, author);
});

ev.emit('read', '测试标题', 'jeason');

// 如果在emit即发布后再订阅，这个订阅并不会执行。
ev.on('read', function(title, author){
    console.log('在发布后再订阅：', title, author);
})