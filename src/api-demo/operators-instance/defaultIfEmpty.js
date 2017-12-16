/** 
 * @name defaultIfEmpty如果完成时都没有发射就发射一个默认值
 * public defaultIfEmpty(defaultValue: any): Observable
 */
//defaultIfEmpty();
function defaultIfEmpty() {
    //If no clicks happen in 5 seconds, then emit "no clicks"
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
    var result = clicksBeforeFive.defaultIfEmpty('no clicks');
    result.subscribe(x => console.log(x));
}