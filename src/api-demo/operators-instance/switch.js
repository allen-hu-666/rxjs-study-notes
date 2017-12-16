/** 
 * @name switch切换流
 * public switch(): Observable<T>s
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switch
 */
//switch1();
function switch1() {
    // Rerun an interval Observable on every click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    // Each click event is mapped to an Observable that ticks every second
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
    var switched = higherOrder.switch();
    // The outcome is that `switched` is essentially a timer that restarts
    // on every click. The interval Observables from older clicks do not merge
    // with the current interval Observable.
    switched.subscribe(x => console.log(x));
}
/** 
 * @name switchMap切换流
 * public switchMap(project: function(value: T, ?index: number): ObservableInput,
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switch
 */
//switchMap();
function switchMap() {
    // Rerun an interval Observable on every click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
}
/** 
 * @name switchMapTo切换流
 * public switchMapTo(innerObservable: ObservableInput,
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switch
 */
// switchMapTo();
function switchMapTo() {
    // Rerun an interval Observable on every click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.switchMapTo(Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
}