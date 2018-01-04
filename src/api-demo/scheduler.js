import Rx from 'rxjs';
/**
 * @name 什么是调度者？调度者控制着何时启动一个订阅和何时通知被发送。它有三个组件构成
 * queue 队列
    asap 尽快
    async 异步
    animationFrame 帧动画
 */
/**
 * @name 异步发送消息，.observeOn(Rx.Scheduler.async)
 */
//test1();
function test1() {
    var observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    }).observeOn(Rx.Scheduler.async);
    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err
        ),
        complete: () => console.log('done')
    });
    console.log('just after subscribe');
}
/**
 * @name 异步发送消息，.observeOn(Rx.Scheduler.async)
 */
//test2();
function test2() {
    var observable = Rx.Observable.create(function (proxyObserver) {
        proxyObserver.next(1);
        proxyObserver.next(2);
        proxyObserver.next(3);
        proxyObserver.complete();
    }).observeOn(Rx.Scheduler.async);
    var finalObserver = {
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err
        ),
        complete: () => console.log('done'),
    };
    console.log('just before subscribe');
    observable.subscribe(finalObserver);
    console.log('just after subscribe');
}