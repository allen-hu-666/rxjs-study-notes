/** 
 * @name withLatestFrom 运行方式跟 combineLatest 有点像，只是他有主从的关系，只有在主要的 observable 送出新的值时，才会执行 callback
 * public withLatestFrom(other: ObservableInput, project: Function): Observable
 */
//withLatestFrom();
function withLatestFrom() {
    //On every click event, emit an array with the latest timer event plus the click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var timer = Rx.Observable.interval(1000);
    var result = clicks.withLatestFrom(timer);
    result.subscribe(x => console.log(x));
}
//withLatestFrom2();
function withLatestFrom2() {
    var main = Rx.Observable.from('hello').zip(Rx.Observable.interval(500), (x, y) => x);
    var some = Rx.Observable.from([0, 1, 0, 0, 0, 1]).zip(Rx.Observable.interval(300), (x, y) => x);

    var example = main.withLatestFrom(some, (x, y) => {
        return y === 1 ? x.toUpperCase() : x;
    });

    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
}