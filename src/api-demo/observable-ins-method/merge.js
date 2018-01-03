/** 
 * @name merge合并流
 * public merge(other: ObservableInput, concurrent: number, scheduler: Scheduler): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-merge
 */
//merge();
function merge() {
    //Merge together two Observables: 1s interval and clicks
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var timer = Rx.Observable.interval(1000);
    var clicksOrTimer = clicks.merge(timer);
    clicksOrTimer.subscribe(x => console.log(x));
}
//merge2();
function merge2() {
    //Merge together 3 Observables, but only 2 run concurrently
    var timer1 = Rx.Observable.interval(1000).take(10);
    var timer2 = Rx.Observable.interval(2000).take(6);
    var timer3 = Rx.Observable.interval(500).take(10);
    var concurrent = 2; // the argument
    var merged = timer1.merge(timer2, timer3, concurrent);
    merged.subscribe(x => console.log(x));
}
/** 
 * @name mergeAll合并多个流
 * public mergeAll(concurrent: number): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeAll
 */
//mergeAll();
function mergeAll() {
    // Spawn a new interval Observable for each click event, and blend their outputs as one Observable
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
    //higherOrder.subscribe(x => console.log(x));
    var firstOrder = higherOrder.mergeAll();
    firstOrder.subscribe(x => console.log(x));
}
//mergeAll2();
function mergeAll2() {
    // Count from 0 to 9 every second for each click, but only allow 2 concurrent timers
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(11));
    var firstOrder = higherOrder.mergeAll(2);// 同时merge的最多允许两个
    firstOrder.subscribe(x => console.log(x));
}
/** 
 * @name mergeMap合并流
 * public mergeMap(
 * project: function(value: T, ?index: number): ObservableInput, 
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any,
 * concurrent: number): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
 */
//mergeMap();
function mergeMap() {
    // Map and flatten each letter to an Observable ticking every 1 second
    //var letters = Rx.Observable.of('a', 'b', 'c');
    var letters = Rx.Observable.fromEvent(document, 'click');
    var result = letters.mergeMap(x =>
        Rx.Observable.interval(1000).map(i => x + i).take(11)
        , 2);
    result.subscribe(x => console.log(x));

    // Results in the following:
    // a0
    // b0
    // c0
    // a1
    // b1
    // c1
    // continues to list a,b,c with respective ascending integers
}
/** 
 * @name mergeMapTo
 * mergeMapTo(innerObservable: ObservableInput,
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any,
 * concurrent: number): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMapTo
 */
//mergeMapTo();
function mergeMapTo() {
    // For each click event, start an interval Observable ticking every 1 second
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.mergeMapTo(Rx.Observable.interval(1000).take(11));
    result.subscribe(x => console.log(x));
}
/** 
 * @name mergeScan
 * public mergeScan(accumulator: function(acc: R, value: T): Observable<R>, seed: *, concurrent: number): Observable<R>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeScan
 */
// mergeScan();
function mergeScan() {
    // Count the number of click events
    const click$ = Rx.Observable.fromEvent(document, 'click');
    const one$ = click$.mapTo(1);
    const seed = 0;
    const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
    count$.subscribe(x => console.log(x));

    // Results:
    1
    2
    3
    4
    // ...and so on for each click
}