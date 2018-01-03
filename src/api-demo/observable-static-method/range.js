/**
 * @name range() 发出区间范围内的数字序列
 * public static range(start: number, count: number, scheduler: Scheduler): Observable
 */
//range();
function range() {
  // 发出从1到10的数
  var numbers = Rx.Observable.range(1, 10);
  numbers.subscribe(x => console.log(x));
}