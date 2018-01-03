/**
 * @name defer() 创建一个什么数据都不发出并且立马完成的 Observable。
 * public static empty(scheduler: Scheduler): Observable
 */
//empty();
function empty() {
  // 发出数字7, 然后完成。
  var result = Rx.Observable.empty().startWith(7);
  result.subscribe(x => console.log(x));
}
//empty2();
function empty2() {
  // 仅将奇数映射并打平成字母序列abc。
  var interval = Rx.Observable.interval(1000);
  var result = interval.mergeMap(x =>
    x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
  );
  result.subscribe(x => console.log(x));

  // 结果如下:
  // x 是间隔的计数比如：0,1,2,3,...
  // x 1000ms 出现一次
  // 如果 x % 2 等于 1 打印 abc
  // 如果 x % 2 不等于1 什么也不输出
}