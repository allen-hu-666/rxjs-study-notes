/**
 * @name timer() 就像是interval, 但是你可以指定什么时候开始发送
 * public static timer(initialDelay: number | Date, period: number, scheduler: Scheduler): Observable
 */
//timer();
function timer() {
  // 每隔1秒发出自增的数字，3秒后开始发送。
  var numbers = Rx.Observable.timer(3000, 1000);
  numbers.subscribe(x => console.log(x));
}
//timer2();
function timer2() {
  // 5秒后发出一个数字
  var numbers = Rx.Observable.timer(5000);
  numbers.subscribe(x => console.log(x));
}