/** 
 * @name find 找到某个值，跟filter不一样，只会发射一次
 * public find(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable<T>
 */
//find();
function find() {
    // Find and emit the first click that happens on a DIV element
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.find(ev => ev.target.tagName === 'DIV');
    result.subscribe(x => console.log(x));
}
/** 
 * @name findIndex 找到某个值的index，跟filter不一样，只会发射一次
 * public findIndex(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable
 */
//findIndex();
function findIndex() {
    // Emit the index of first click that happens on a DIV element
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
    result.subscribe(x => console.log(x));
}