// https://blog.csdn.net/lyt_angularjs/article/details/94611088

// 主题，
class Event{
    constructor(callback){
        this.subs = [];
        // 每个主题
        this.callback = callback;
    }
}