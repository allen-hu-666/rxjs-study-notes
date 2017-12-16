/** 
 * @name retry 当错误时重新发射
 * public retry(count: number): Observable
 */
//retry();
function retry() {
  // Count the number of click events that happened in 5 seconds
  var clicksInFiveSeconds = Rx.Observable.interval(1000).take(4);
  clicksInFiveSeconds.retry(3)
    .subscribe(x => console.log(x));
}
/** 
 * @name retryWhen 当错误时重新发射
 * public retryWhen(notifier: function(errors: Observable): Observable): Observable
 */
//retry();
function retryWhen() {
  // Count the number of click events that happened in 5 seconds
  var clicksInFiveSeconds = Rx.Observable.interval(1000).take(4);
  clicksInFiveSeconds.retry(3)
    .subscribe(x => console.log(x));
}