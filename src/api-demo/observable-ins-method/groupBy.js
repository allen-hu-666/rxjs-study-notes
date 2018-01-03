/** 
 * @name groupBy 把一个流分成几个流
 * public groupBy(keySelector: function(value: T): K, elementSelector: function(value: T): R,
 * durationSelector: function(grouped: GroupedObservable<K, R>): Observable<any>): Observable<GroupedObservable<K, R>>
 */
// groupBy();
function groupBy() {
  var interval = Rx.Observable.interval(1000).take(10);
  var result = interval.groupBy(i=>{
    console.log(i)
    return i%3
  });
  result.subscribe(x => console.log(x));
}