/** 
 * @name 根据Observable审计
 * public audit(durationSelector: function(value: T): SubscribableOrPromise): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-audit
 */
//audit();
function audit() {
    //鼠标点下时，计时开始，当observable或promise发射一个值或完成时，发射最新的一个值，计时结束
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.audit(ev => Rx.Observable.interval(1000));
    result.subscribe(res=>{
        console.log(res)
    });
}
/** 
 * @name 根据时间审计
 * public auditTime(duration: number, scheduler: Scheduler): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-auditTime
 */
//auditTime();
function auditTime() {
    //鼠标点下时，计时开始，2秒内有无论有多少个点击，2秒后都会发射最后一个值，然后关闭计时器，等待下一次开始
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.auditTime(2000);
    result.subscribe(x => console.log(x));
}
/** 
 * @name 根据Observable节流
 * public throttle(duration: number, scheduler: Scheduler): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle
 */
//throttle();
function throttle() {
    //鼠标点下时，发射值，禁用发射，2秒后允许
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.throttle(ev => Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
}
/** 
 * @name 根据时间节流
 * public throttleTime(duration: number, scheduler: Scheduler): Observable<T>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttleTime
 */
//throttleTime();
function throttleTime() {
    //鼠标点下时，发射值，禁用发射，2秒后允许
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.throttleTime(2000);
    result.subscribe(x => console.log(x));
}