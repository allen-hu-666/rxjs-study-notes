/** 
 * @name debounce按键消除抖动
 * public debounce(durationSelector: function(value: T): SubscribableOrPromise): Observable
 */
//debounce();
function debounce() {
    //Emit the most recent click after a burst of clicks
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.debounce(() => Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
}
/** 
 * @name debounceTime按键消除抖动
 * public debounceTime(dueTime: number, scheduler: Scheduler): Observable
 */
//debounceTime();
function debounceTime() {
    //Emit the most recent click after a burst of clicks
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.debounceTime(1000);
    result.subscribe(x => console.log(x));
}