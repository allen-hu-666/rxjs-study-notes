/**
 * @name interval() 定期发出自增的数字
 * public static interval(period: number, scheduler: Scheduler): Observable
 */
//interval();
function interval() {
  // 每1秒发出一个自增数
  var numbers = Rx.Observable.interval(1000);
  numbers.subscribe(x => console.log(x));
}