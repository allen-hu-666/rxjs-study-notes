/** 
 * @name timeInterval
 * public timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>
 */
// timeInterval();
function timeInterval() {
    //Emit clicks at a rate of at most one click per second
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.throttleTime(1000);
    result.subscribe(x => console.log(x));
}