/** 
 * @name concat连接流
 * public concat(other: ObservableInput, scheduler: Scheduler): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat
 */
//concat();
function concat() {
    //Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
    var timer = Rx.Observable.interval(1000).take(4);
    var sequence = Rx.Observable.range(1, 10);
    var result = timer.concat(sequence);
    result.subscribe(x => console.log(x));

    // results in:
    // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
}
//concat2();
function concat2() {
    //Concatenate 3 Observables
    var timer1 = Rx.Observable.interval(1000).take(10);
    var timer2 = Rx.Observable.interval(2000).take(6);
    var timer3 = Rx.Observable.interval(500).take(10);
    var result = timer1.concat(timer2, timer3);
    result.subscribe(x => console.log(x));

    // results in the following:
    // (Prints to console sequentially)
    // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
    // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
    // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
}
/** 
 * @name concatAll连接流
 * public concatAll(): Observable
 * concatAll is equivalent to mergeAll with concurrency parameter set to 1.
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatAll
 */
//concatAll();
function concatAll() {
    //For each click event, tick every second from 0 to 3, with no concurrency
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
    var firstOrder = higherOrder.concatAll();
    firstOrder.subscribe(x => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
}
/** 
 * @name concatMap
 * public concatMap(project: function(value: T, ?index: number): ObservableInput,
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap
 */
//concatMap();
function concatMap() {
    //For each click event, tick every second from 0 to 3, with no concurrency
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
    result.subscribe(x => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
}
/** 
 * @name concatMapTo
 * public concatMapTo(innerObservable: ObservableInput,
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMapTo
 */
//concatMapTo();
function concatMapTo() {
    //For each click event, tick every second from 0 to 3, with no concurrency
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
    result.subscribe(x => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
}