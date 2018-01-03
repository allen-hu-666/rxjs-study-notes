/** 
 * @name take根据发射次数关闭
 * public take(count: number): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-take
 */
//take();
function take() {
    //Take the first 5 seconds of an infinite 1-second interval Observable
    var interval = Rx.Observable.interval(1000);
    var five = interval.take(5);
    five.subscribe(x => console.log(x));
}
/** 
 * @name takeLast流关闭时，发射后面的8个值
 * public takeLast(count: number): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeLast
 */
//takeLast();
function takeLast() {
    //Take the last 3 values of an Observable with many values
    var many = Rx.Observable.range(1, 100);
    var lastThree = many.takeLast(3);
    lastThree.subscribe(x => console.log(x));
}
/** 
 * @name takeUntil根据别的流发射或关闭关闭
 * public takeUntil(notifier: Observable): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil
 */
//takeUntil();
function takeUntil() {
    //Tick every second until the first click happens
    var interval = Rx.Observable.interval(1000);
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = interval.takeUntil(clicks);
    result.subscribe(x => console.log(x));
}
/** 
 * @name takeWhile根据判断是否关闭
 * public takeWhile(predicate: function(value: T, index: number): boolean): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile
 */
//takeWhile();
function takeWhile() {
    //Emit click events only while the clientX property is greater than 200
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.takeWhile(ev => ev.clientX > 200);
    result.subscribe(x => console.log(x));
}