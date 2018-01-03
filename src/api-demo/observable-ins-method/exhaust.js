/** 
 * @name exhaust 类似mergeAll，但要等每个observable完成才能继续发射下一个
 * public exhaust(): Observable
 */
//exhaust();
function exhaust() {
    // Run a finite timer for each click, only if there is no currently active timer
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(6));
    var result = higherOrder.exhaust();
    result.subscribe(x => console.log(x));
}

/** 
 * @name exhaustMap 类似mergeAll，但要等每个observable完成才能继续发射下一个
 * public exhaustMap(project: function(value: T, ?index: number): ObservableInput, 
 * resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any)
 * : Observable
 */
//exhaustMap();
function exhaustMap() {
    // Run a finite timer for each click, only if there is no currently active timer
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000).take(6));
    result.subscribe(x => console.log(x));
}