/** 
 * @name lift 当complete时发射最后一个值
 * public lift(operator: Operator): Observable
 **/
//lift();
function lift() {
  var interval = Rx.Observable.of(123, 734, 456, 5765);
  var result = interval.lift();
  result.subscribe(console.log);
}