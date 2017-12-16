import Rx from 'rxjs';

//start()

function start() {
    var observable = Rx.Observable.create(function (observer) {
        observer.next('heasdsallo');
    });
    /* 
        什么是观察者?观察者是可观察对象所发送数据的消费者，观察者简单而言是一组 回调函数 
        分别对应一种被可观察对象发送的通知的类型:next, error和 complete。
        下面是一个典型的观察者对象的例子
     */
    var observer = {
        next: x => console.log('Observer got a next value: ' + x),
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification ')
    };
    observable.subscribe(observer);
    observable.subscribe(res => {
        console.log(res);
    });
}