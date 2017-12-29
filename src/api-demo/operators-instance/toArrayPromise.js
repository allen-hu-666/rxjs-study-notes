/** 
 * @name toArray 转化为数组
 * public public toArray(): Observable<any[]> | WebSocketSubject<T> | Observable<T>
 */
//toArray();
function toArray() {
    //On every click event, emit an array with the latest timer event plus the click event
    let clicks = Rx.Observable.from([213, 14, 435, 456]);
    let res = clicks.toArray();
    res.subscribe(console.log);
}

/** 
 * @name toPromise 转化为Promise
 * public toPromise(PromiseCtor: *): Promise<T>
 */
//toPromise1();
function toPromise1() {
    // Using normal ES2015
    let source = Rx.Observable
        .of(42)
        .toPromise();

    source.then((value) => console.log('Value: %s', value));
    // => Value: 42
}
//toPromise2();
function toPromise2() {
    // Rejected Promise
    // Using normal ES2015
    let source = Rx.Observable
        .throw(new Error('woops'))
        .toPromise();

    source
        .then((value) => console.log('Value: %s', value))
        .catch((err) => console.log('Error: %s', err));
    // => Error: Error: woops
}
//toPromise3();
function toPromise3() {
    // Setting via the config 全局配置RXJS转化为Promise用的类
    Rx.config.Promise = RSVP.Promise;

    let source = Rx.Observable
        .of(42)
        .toPromise();

    source.then((value) => console.log('Value: %s', value));
    // => Value: 42
}
//toPromise4();
function toPromise4() {
    // Setting via the method 局部配置RXJS转化为Promise用的类
    let source = Rx.Observable
        .of(42)
        .toPromise(RSVP.Promise);

    source.then((value) => console.log('Value: %s', value));
    // => Value: 42
}