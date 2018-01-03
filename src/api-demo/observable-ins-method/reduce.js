/** 
 * @name reduce 
 * public reduce(accumulator: function(acc: R, value: T, index: number): R, seed: R): Observable<R>
 */
//reduce();
function reduce() {
  // Count the number of click events that happened in 5 seconds
  var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
    .takeUntil(Rx.Observable.interval(10000));
  var ones = clicksInFiveSeconds.mapTo(1);
  var seed = 0;
  var count = ones.reduce((acc, one) => acc + one, seed);
  count.subscribe(x => console.log(x));
}