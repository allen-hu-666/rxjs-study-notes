/** 
 * @name zip 取每个 observable 相同顺位的元素并传入 callback，也就是说每个 observable 的第 n 个元素会一起被传入 callback
 * public throttle(durationSelector: function(value: T): SubscribableOrPromise): Observable<T>
 */
// zip();
function zip() {
    var source = Rx.Observable.interval(500).take(3);
    var newest = Rx.Observable.interval(300).take(6);

    var example = source.zip(newest, (x, y) => x + y);

    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    // 0
    // 2
    // 4
    // complete
}

/** 
 * @name zipAll 取每个 observable 相同顺位的元素并传入 callback，也就是说每个 observable 的第 n 个元素会一起被传入 callback
 * public zipAll(project: *): Observable<R> | WebSocketSubject<T> | Observable<T>
 */
//zipAll();
function zipAll() {
    var source = Rx.Observable.interval(500).take(3);
    var newest = Rx.Observable.interval(300).take(6);

    var example = source.zip(newest, (x, y) => x + y);

    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    // 0
    // 2
    // 4
    // complete
}