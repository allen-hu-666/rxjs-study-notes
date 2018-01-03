/** 
 * @name isEmpty 当complete时没有任何发射则返回true，否则是false
 * public isEmpty(): Observable
 **/
//isEmpty();
function isEmpty() {
  var interval = Rx.Observable.of();
  var result = interval.isEmpty();
  result.subscribe(console.log);
}