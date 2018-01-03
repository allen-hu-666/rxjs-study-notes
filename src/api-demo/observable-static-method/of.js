/**
 * @name of() 发出你提供的参数，然后完成。
 * public static of(values: ...T, scheduler: Scheduler): Observable<T>
 */
//of();
function of() {
  // 发出 10、20、 30, 然后是 'a'、 'b'、 'c', 紧接着开始每秒发出。
  var numbers = Rx.Observable.of(10, 20, 30);
  var letters = Rx.Observable.of('a', 'b', 'c');
  var interval = Rx.Observable.interval(1000);
  var result = numbers.concat(letters).concat(interval);
  result.subscribe(x => console.log(x));
}