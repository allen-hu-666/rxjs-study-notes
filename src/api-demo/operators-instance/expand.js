/** 
 * @name expand 类似mergeAll，但要等每个observable完成才能继续发射下一个
 * public expand(project: function(value: T, index: number),
 * concurrent: number, scheduler: Scheduler): Observable
 */
//expand();
function expand() {
    // Start emitting the powers of two on every click, at most 10 of them
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var powersOfTwo = clicks
        .mapTo(1)
        .expand(x => Rx.Observable.of(2 * x).delay(1000))
        .take(10);
    powersOfTwo.subscribe(x => console.log(x));
}