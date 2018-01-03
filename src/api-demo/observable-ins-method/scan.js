/** 
 * @name scan 累加器
 * public scan(accumulator: function(acc: R, value: T, index: number): R, seed: T | R): Observable<R>
 */
//scan();
function scan() {
  // Count the number of click events
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var ones = clicks.mapTo(1);
  var seed = 0;
  var count = ones.scan((acc, one) => acc + one, seed);
  count.subscribe(x => console.log(x));
}