/** 
 * @name elementAt 只有第index+1次发射的才会通过
 * public elementAt(index: number, defaultValue: T): Observable
 */
//elementAt();
function elementAt() {
    // Emit only the third click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.elementAt(2);
    result.subscribe(x => console.log(x));

    // Results in:
    // click 1 = nothing
    // click 2 = nothing
    // click 3 = MouseEvent object logged to console
}