/** 
 * @name map映射流的值
 * public map(project: function(value: T, index: number): R, thisArg: any): Observable<R>
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map
 */
//map();
function map() {
    //Map every every click to the clientX position of that click
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var positions = clicks.map(ev => ev.clientX);
    positions.subscribe(x => console.log(x));
}
/** 
 * @name mapTo映射流的值
 * public mapTo(value: any): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mapTo
 */
//mapTo();
function mapTo() {
    //Map every every click to the string 'Hi'
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var greetings = clicks.mapTo('Hi');
    greetings.subscribe(x => console.log(x));
}
