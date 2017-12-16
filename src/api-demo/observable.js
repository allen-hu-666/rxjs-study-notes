import Rx from 'rxjs'
//import { timeout } from '_rxjs@5.5.2@rxjs/operator/timeout';
import { setTimeout } from 'core-js/library/web/timers';
//testFromEvent();
function testFromEvent() {
    //var button = document;
    //操作符
    Rx.Observable.fromEvent(document, 'click')
        .throttleTime(1000) //每秒最多执行一次
        .map(event => { //拦截数据
            console.log(event);
            return event.clientX;
        })
        .scan((count, clientX) => count + clientX, 0) //累加器,第二个参数是初始值
        .subscribe(count => console.log('Clicked!' + count));
}

//observableCreate();

function observableCreate() {
    var observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        console.log(observer); // 每次subscribe都执行一次
        let inter = setInterval(() => {
            observer.next('hi');
            console.log("asd");
        }, 1000);
        setTimeout(() => {
            observer.complete();
            clearInterval(inter); //虽然complete，但Interval还在
        }, 10000);
    });
    console.log('just before subscribe');
    observable.subscribe(data => {
        console.log(data);
    });
    /* 
    多个subscribe不会共享，当每次使用observable.subscribe订阅时，create里的函数都执行一次，
    所以observable.subscribe必定create里的函数，就像调用了一个函数
    */
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');
}

//thowError();

function thowError() {
    var observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        try {
            asfdsfvesfewew()
        } catch (err) {
            observer.error(err); // 抛出错误
        }
        observer.complete();
        observer.next(4); //不会被执行
    });
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
}
//unsubscribe()

function unsubscribe() {
    var observable = Rx.Observable.create(function (observer) {
        //console.log(observer);
        let inter = setInterval(() => {
            observer.next('不断执行');//
            console.log("asdsa");// 
            /* 
            subscription.unsubscribe()只会让next不生效，不会注销掉setInterval
            */
            if(observer.isStopped) clearInterval(inter);
        }, 1000);
    });
    //console.log(observable);
    const subscription = observable.subscribe(x => console.log('got value ' + x));
    setTimeout(()=>{
        subscription.unsubscribe();
    },10000)
}