function Event() {
    this._events = {};
}

Event.prototype.on = function (type, fn) {
    if (this._events[type]) {
        this._events[type].push(fn);
    } else {
        this._events[type] = [fn];
    }
    return this;
}

Event.prototype.emit = function () {
    let _this = this;
    let type = Array.prototype.shift.call(arguments);
    let arr = this._events[type];
    arr.forEach(element => {
        element.apply(_this, arguments);
    });
    return _this;
}

Event.prototype.off = function (type, fn) {
    let _this = this;
    let fns = this._events[type];

    // 如果缓存列表中没有相应的fn,返回false；
    if(!fns) return false;
    // 如果没有指定fn,就将对应type的fn都清空
    if(!fn){
        fns && (fns.length = 0);
    }else{
        for (let i = 0, len = fns.length; i < len; i++) {
            let _fn = fns[i];
            if (_fn === fn) {
                fns.splice(i, 1);
                break;
            }
        }
    }
 
    return _this;
}

Event.prototype.once= function(type, fn){
    let _this = this;
    function one(){
        _this.off(type, one);
        fn.apply(_this, arguments);
    }
    _this.on(type, one);
    return _this;
}

// DEMO1

let ev = new Event();
ev.on('read', function (title, author) {
    console.log('我要订阅你的内容:', title, author);
});

ev.emit('read', '测试标题', 'jeason');
console.log('------------------------------------------');

// 如果在emit即发布后再订阅，这个订阅并不会执行。
let fn = function (title, author) {
    console.log('在发布后再订阅：', title, author);
};
ev.on('read', fn);

ev.emit('read', '测试标题', 'jeason');
console.log('------------------------------------------');

ev.off('read', fn);
ev.emit('read', '测试标题', 'jeason');
console.log('------------------------------------------');

// DEMO2

ev.on('notice', function (notice) {
    console.log('接收多次通知:', notice);
});
ev.once('notice', function (notice) {
    console.log('只能通知一次:', notice);
});

ev.emit('notice', '洞妖洞妖，收到请回答！');
console.log('------------------------------------------');
ev.emit('notice', '洞妖洞妖，我是洞拐，收到请回答~');

console.log('------------------------------------------');
let onoffFn1 = function(notice){
    console.log('测试onoffFn1 --- 111', notice);
}
let onoffFn2 = function (notice) {
    console.log('测试onoffFn2 --- 2222', notice);
}
let onoffFn3 = function (notice) {
    console.log('测试onoffFn3 --- 3333', notice);
}
ev.on('onoff', onoffFn1);
ev.on('onoff', onoffFn2);
ev.on('onoff', onoffFn3);
ev.emit('onoff', 'onoff测试');
console.log('------------------------------------------');
ev.off('onoff', onoffFn1);
ev.emit('onoff', '取消onoffFn1');
console.log('------------------------------------------');
ev.off('onoff');
ev.emit('onoff', '取消所有');
console.log('------------------------------------------');

