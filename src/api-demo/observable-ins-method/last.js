/** 
 * @name last 当complete时发射最后一个值
 * public last(predicate: function): Observable
 **/
//last();
function last() {
  var interval = Rx.Observable.of(123, 734, 456, 5765);
  var result = interval.last();
  result.subscribe(console.log);
}