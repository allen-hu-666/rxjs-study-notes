/** 
 * @name do 每次发射调用下这个函数
 * public do(nextOrObserver: Observer | function, error: function, complete: function): Observable
 */
// doDemo();
function doDemo() {
    //Map every every click to the clientX position of that click, while also logging the click event
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var positions = clicks
        .do(ev => console.log(ev))
        .map(ev => ev.clientX);
    positions.subscribe(x => console.log(x));
}