/** 
 * @name throttle
 * public throttle(durationSelector: function(value: T): SubscribableOrPromise): Observable<T>
 */
//throttle();
function throttle() {
    //Emit clicks at a rate of at most one click per second
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.throttle(ev => Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
}
/** 
 * @name throttleTime
 * public throttleTime(duration: number, scheduler: Scheduler): Observable<T>
 */
// throttleTime();
function throttleTime() {
    //Emit clicks at a rate of at most one click per second
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.throttleTime(1000);
    result.subscribe(x => console.log(x));
}