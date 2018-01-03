import Rx from 'rxjs/Rx';

/**
 * @name 转化可观察对象
 */
//test1();
function test1() {
    //一个或多个值转化为可观察对象
    Rx.Observable.of(1, 2, 3);
    //From array of values 数组->可观察对象
    Rx.Observable.from([1, 2, 3]);
    //From an event 事件->可观察对象
    Rx.Observable.fromEvent(document.querySelector('body'), 'click');
    //From a promise promise->可观察对象
    Rx.Observable.fromPromise(fetch('/users'));
    //From a callback(last argument is a callback) 回调函数->可观察对象
    //fs.exists = (path,cb(exists))
    function timeOut(data, callback) {
        setTimeout(() => {
            callback(99 + data);
        }, 1000);
    }
    var exists = Rx.Observable.bindCallback(timeOut);
    exists(50).subscribe(data => console.log('Does file exist ? ', data));
}
/**
 * @name create()创建可观察对象
 */
//create();
function create() {
    //外部产生新事件
    var myObservable = new Rx.Subject();
    myObservable.subscribe(value => console.log(value));
    myObservable.next('foo');
    //内部产生新事件
    var myObservable = Rx.Observable.create(observer => {
        observer.next('foo');
        setTimeout(() => observer.next('bar'), 1000);
    });
    myObservable.subscribe(value => console.log(value));
}
/**
 * @name bindCallback() 将一个回调函数转化为一个能返回可观察对象的函数
 */
//bindCallback();
function bindCallback() {
    function timeOut(data, callback) {
        setTimeout(() => {
            callback(99 + data);
        }, 1000);
    }
    var eg = Rx.Observable.bindCallback(timeOut);
    eg(50).subscribe(data => console.log('1秒后显示该数据 ', data));
}
/**
 * @name bindNodeCallback() 将一个NodeJS风格的回调函数API转化为一个能返回可观察对象的函数；
 */
//bindNodeCallback();
function bindNodeCallback() {
    //import * as fs from 'fs';
    var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
    var result = readFileAsObservable('./roadNames.txt', 'utf8');
    result.subscribe(x => console.log(x), e => console.error(e));
}
/**
 * @name combineLatest() 联合多个Observable产生一个新的Observable
 */
//combineLatest();
function combineLatest() {
    // Dynamically calculate the Body-Mass Index from an Observable of weight and one for height
    var weight = Rx.Observable.of(70, 72, 76, 79, 75);
    var height = Rx.Observable.of(1.76, 1.77, 1.78);
    var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
    bmi.subscribe(x => console.log('BMI is ' + x));
}

/**
 * @name concat() 连接多个可观察对象，并顺序发出他们的值，一个可观察对象跟在另一个的后面
 */
//concat();
function concat() {
    // Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
    var timer = Rx.Observable.interval(1000).take(4);
    var sequence = Rx.Observable.range(1, 10);
    var result = Rx.Observable.concat(timer, sequence);
    result.subscribe(x => console.log(x));
}
//concat2()
function concat2() {
    var timer1 = Rx.Observable.interval(1000).take(10);
    var timer2 = Rx.Observable.interval(2000).take(6);
    var timer3 = Rx.Observable.interval(500).take(10);
    var result = Rx.Observable.concat(timer1, timer2, timer3);
    result.subscribe(x => console.log(x));
}
/**
 * @name defer() 以惰性的方式产生一个Observable,也就是说，当被订阅的时候才会产生
 */
//defer();
function defer() {
    // Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
    var clicksOrInterval = Rx.Observable.defer(function () {
        if (Math.random() > 0.5) {
            return Rx.Observable.fromEvent(document, 'click');
        } else {
            return Rx.Observable.interval(1000);
        }
    });
    clicksOrInterval.subscribe(x => console.log(x));
}
//defer2();
function defer2() {
    /* Using an observable sequence */
    var source = Rx.Observable.defer(() => Rx.Observable.return(42));
    //console.log(source);
    var subscription = source.subscribe(
        x => console.log(`onNext: ${x}`),
        e => console.log(`onError: ${e}`),
        () => console.log('onCompleted'));
    source.subscribe(
        x => console.log(`onNext: ${x}`),
        e => console.log(`onError: ${e}`),
        () => console.log('onCompleted'));
    // => onNext: 42
    // => onCompleted
}
//defer3()
function defer3() {
    /* Using a promise */
    var source = Rx.Observable.defer(() => RSVP.Promise.resolve(42));
    var subscription = source.subscribe(
        x => console.log(`onNext: ${x}`),
        e => console.log(`onError: ${e}`),
        () => console.log('onCompleted'));
    // => onNext: 42
    // => onCompleted
}
/**
 * @name empty() 创建一个不发射任何值的Observable,它只会发射一个complate通知
 */
//empty();
function empty() {
    var result = Rx.Observable.empty().startWith(7);
    result.subscribe(x => console.log(x));
    var source = Rx.Observable.empty();
    var subscription = source.subscribe(
        x => console.log(`onNext: ${x}`),
        e => console.log(`onError: ${e}`),
        () => console.log('onCompleted'));
    // => onCompleted
    //Map and flatten only odd numbers to the sequence 'a', 'b', 'c
    var interval = Rx.Observable.interval(1000);
    var result2 = interval.mergeMap(x =>
        x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.
            empty()
    );
    result2.subscribe(x => console.log(x));
}
/**
 * @name from() 将一个数组、类数组(字符串也可以)，Promise、可迭代对象，类可观察对象、转化为一个Observable
 */
//from();
function from() {
    // 数组=>Observable
    var array = [10, 20, 30];
    var result = Rx.Observable.from(array);
    result.subscribe(x => console.log(x));
}
/**
 * @name merge() 创建一个发射所有被合并的observable所发射的值。
 */
//merge();
function merge() {
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var timer = Rx.Observable.interval(1000);
    var clicksOrTimer = Rx.Observable.merge(clicks, timer);
    clicksOrTimer.subscribe(x => console.log(x));
}
//merge2();
function merge2() {
    //Merge together 3 Observables, but only 2 run concurrently
    var timer1 = Rx.Observable.interval(1000).take(10);
    var timer2 = Rx.Observable.interval(2000).take(6);
    var timer3 = Rx.Observable.interval(500).take(10);
    var concurrent = 2; // the argument
    var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
    merged.subscribe(x => console.log(x));
}
//merge3();
function merge3() {
    var source1 = Rx.Observable.interval(100)
        .timeInterval()
        .pluck('interval');
    var source2 = Rx.Observable.interval(150)
        .timeInterval()
        .pluck('interval');
    var source = Rx.Observable.merge(
        source1,
        source2).take(10);
    var subscription = source.subscribe(
        function (x) {
            console.log('Next: ' + x);
        },
        function (err) {
            console.log('Error: ' + err);
        },
        function () {
            console.log('Completed');
        });
    // => Next: 100
    // => Next: 150
    // => Next: 100
    // => Next: 150
    // => Next: 100
    // => Completed
}
