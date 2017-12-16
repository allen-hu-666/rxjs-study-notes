/** 
 * @name count计算发射的次数
 * public count(predicate: function(value: T, i: number, source: Observable<T>): boolean): Observable
 */
//count();
function count() {
    //Counts how many seconds have passed before the first click happened
    var seconds = Rx.Observable.interval(1000);
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var secondsBeforeClick = seconds.takeUntil(clicks);
    var result = secondsBeforeClick.count();
    result.subscribe(x => console.log(x));
}
//count2()
function count2() {
    //Counts how many odd numbers are there between 1 and 7
    var numbers = Rx.Observable.range(1, 7);
    var result = numbers.count(i => i % 2 === 1);
    result.subscribe(x => console.log(x));
    // Results in:
    // 4
}