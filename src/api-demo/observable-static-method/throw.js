/**
 * @name throw() 仅仅发出 error 通知，其他什么也不做
 * public static throw(将具体的: any, scheduler: Scheduler): Observable
 */
//throw1();
function throw1() {
  // 先发出数字7，然后发出错误通知。
  var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
  result.subscribe(x => console.log(x), e => console.error(e));
}
//throw2();
function throw2() {
  // 映射并打平成字母序列abc，但当数字为13时抛出错误。
  var interval = Rx.Observable.interval(1000);
  var result = interval.mergeMap(x =>
    x === 13 ?
      Rx.Observable.throw('Thirteens are bad') :
      Rx.Observable.of('a', 'b', 'c')
  );
  result.subscribe(x => console.log(x), e => console.error(e));
}