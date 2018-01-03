/**
 * @name interval() 从不发出任何项的 Observable 。
 * public static never(): Observable
 */
//never();
function never() {
  // 发出7, 然后不发出任何值(也不发出完成通知)。
  function info() {
    console.log('Will not be called');
  }
  var result = Rx.Observable.never().startWith(7);
  result.subscribe(x => console.log(x), info, info);
}