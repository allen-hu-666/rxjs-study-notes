/** 
 * @name buffer根据Observable缓存
 * public buffer(closingNotifier: Observable<any>): Observable<T[]>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer
 */
//buffer();
function buffer() {
    //On every click, emit array of most recent interval events
    // 一开始interval就开始计数了
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var interval = Rx.Observable.interval(1000);
    var buffered = interval.buffer(clicks);
    buffered.subscribe(x => console.log(x));
}
/** 
 * @name bufferCount根据次数缓存
 * public bufferCount(bufferSize: number, startBufferEvery: number): Observable<T[]>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount
 */
//bufferCount();
function bufferCount() {
    //Emit the last two click events as an array
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferCount(2);
    buffered.subscribe(x => console.log(x));
}
//bufferCount2();
function bufferCount2() {
    //On every click, emit the last two click events as an array
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferCount(2, 1);
    buffered.subscribe(x => console.log(x));
}
/** 
 * @name bufferTime根据时间缓存
 * public bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler): Observable<T[]>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferTime
 */
//bufferTime();
function bufferTime() {
    //Every second, emit an array of the recent click events
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferTime(1000);
    buffered.subscribe(x => console.log(x));
}
//bufferTime2();
function bufferTime2() {
    //Every 5 seconds, emit the click events from the next 2 seconds
    //每5秒发射后2秒缓存的值
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferTime(2000, 5000);
    buffered.subscribe(x => console.log(x));
}

/** 
 * @name bufferToggle
 * public bufferToggle(openings: SubscribableOrPromise<O>, closingSelector: function(value: O): SubscribableOrPromise): Observable<T[]>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferToggle
 */
//bufferToggle();
function bufferToggle() {
    //Every other second, emit the click events from the next 500ms
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var openings = Rx.Observable.interval(1000);
    var buffered = clicks.bufferToggle(openings, i => {
        console.log(i);
        return i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
    });
    buffered.subscribe(x => console.log(x));
}

/** 
 * @name bufferWhen根据动态的Observable缓存,跟buffer有点像，但bufferWhen是动态的
 * public bufferWhen(closingSelector: function(): Observable): Observable<T[]>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen
 */
//bufferWhen();
function bufferWhen() {
    //Emit an array of the last clicks every [1-5] random seconds
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var buffered = clicks.bufferWhen(() => {
        const time = 1000 + Math.random() * 4000;
        console.log(time);
        return Rx.Observable.interval(time);
    });
    buffered.subscribe(x => console.log(x));
}