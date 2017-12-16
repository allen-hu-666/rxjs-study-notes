/** 
 * @name filter 过滤值
 * public filter(predicate: function(value: T, index: number): boolean, thisArg: any): Observable
 */
//filter();
function filter() {
    // Emit only click events whose target was a DIV element
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
    clicksOnDivs.subscribe(x => console.log(x));
}