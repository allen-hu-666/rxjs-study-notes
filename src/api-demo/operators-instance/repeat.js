/** 
 * @name repeat 完成时重复发射 
 * public repeat(count: number): Observable
 */
//repeat();
function repeat() {
  // Count the number of click events that happened in 5 seconds
  var clicksInFiveSeconds = Rx.Observable.interval(1000).take(4);
  clicksInFiveSeconds.repeat(3)
    .subscribe(x => console.log(x));
}

/** 
 * @name repeatWhen 
 * public repeatWhen(notifier: function(notifications: Observable): Observable): Observable
 */
//repeatWhen();
function repeatWhen() {
  // Count the number of click events that happened in 5 seconds
  /* var when = Rx.Observable.interval(5000).take(4);
  var interval = Rx.Observable.interval(1000).take(4);
  interval.repeatWhen(e=>{
    concols.log(e)
    return when;
  }).subscribe(x => console.log(x)); */
}