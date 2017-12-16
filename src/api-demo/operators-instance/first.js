/** 
 * @name first 找到某个值，跟filter不一样，只会发射一次
 * public first(predicate: function(value: T, index: number, source: Observable<T>): boolean,
 * resultSelector: function(value: T, index: number): R, defaultValue: R): Observable<T | R>
 */
//first();
function first() {
    // Emit only the first click that happens on the DOM
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.first();
    result.subscribe(x => console.log(x));
}
//first2();
function first2() {
    // Emits the first click that happens on a DIV
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.first(ev => ev.target.tagName === 'DIV');
    result.subscribe(x => console.log(x));
}