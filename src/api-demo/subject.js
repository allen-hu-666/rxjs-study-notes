import Rx from 'rxjs';
/* 
Subject就是一个可观察对象，只不过可以被多播至多个观察者。
同时Subject 也类似于EventEmitter:维护者着众多事件监听器的注册表
 */
//start()
// 多播
function start() {
    var subject = new Rx.Subject();
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    subject.next(1);
    subject.next(2);
}
//study();
// 特殊的
function study() {
    var subject = new Rx.Subject();
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    var observable = Rx.Observable.from([1, 2, 3]);
    observable.subscribe(subject); // You can subscribe providing aSubject
}

//test()

function test() {
    var source = Rx.Observable.from([1, 2, 3]);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);
    multicasted.subscribe({
        next: (v) => console.log('observerA:' + v)
    });
    multicasted.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    multicasted.connect();
}
//test2()
function test2() {
    var source = Rx.Observable.interval(500);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);
    var subscription1, subscription2, subscriptionConnect;
    subscription1 = multicasted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    // We should call `connect()` here, because the first
    // subscriber to `multicasted` is interested in consuming values
    subscriptionConnect = multicasted.connect();
    setTimeout(() => {
        subscription2 = multicasted.subscribe({
            next: (v) => console.log('observerB: ' + v)
        });
    }, 600);
    setTimeout(() => {
        subscription1.unsubscribe();
    }, 1200);
    // We should unsubscribe the shared Observable execution here,
    // because `multicasted`  would have no more subscribers after th
    setTimeout(() => {
        subscription2.unsubscribe();
        subscriptionConnect.unsubscribe(); // for the shared Observable execution
    }, 10000);
}

//test3()
//自动多播
function test3() {
    var source = Rx.Observable.interval(500);
    var subject = new Rx.Subject();
    var refCounted = source.multicast(subject).refCount(); //自动多播
    var subscription1, subscription2, subscriptionConnect;
    // This calls `connect()`, because
    // it is the first subscriber to `refCounted`
    console.log('observerA subscribed');
    subscription1 = refCounted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    setTimeout(() => {
        console.log('observerB subscribed');
        subscription2 = refCounted.subscribe({
            next: (v) => console.log('observerB: ' + v)
        });
    }, 600);
    setTimeout(() => {
        console.log('observerA unsubscribed');
        subscription1.unsubscribe();
    }, 1200);
    // This is when the shared Observable execution will stop, because
    // `refCounted` would have no more subscribers after this
    setTimeout(() => {
        console.log('observerB unsubscribed');
        subscription2.unsubscribe();
    }, 2000);
}

/**
 * @name BehaviorSubject 记录上个发射的值
 */
//test4();
function test4() {
    var subject = new Rx.BehaviorSubject(0); // 0 is the initial value
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    console.log("有初始值");
    subject.next(1);
    subject.next(2);
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    subject.next(3);
}

/**
 * @name ReplaySubject 记录所有发送过的值
 */
//test5();
function test5() {
    var subject = new Rx.ReplaySubject(3); // buffer 3 values for new subscribers ，注:缓存了三个值。
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    console.log("没有初始值")
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
        //之前所有的值都会通知该订阅
    });
    subject.next(5);
}
/**
 * @name ReplaySubject 选择记录多少毫秒的值
 */
//test6();
function test6() {
    var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    var i = 1;
    setInterval(() => subject.next(i++), 200);
    setTimeout(() => {
        subject.subscribe({
            next: (v) => console.log('observerB: ' + v)
        });
    }, 1000);
}
/**
 * @name AsyncSubject 只在结束时发送一个最新值
 */
//test7();
function test7() {
    var subject = new Rx.AsyncSubject();
    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    subject.next(5);
    subject.complete();
}
