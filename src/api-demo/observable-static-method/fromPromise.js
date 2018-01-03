/**
 * @name fromPromise() 将Promise转化为一个Observable，发射一次就完成
 * public static fromPromise(promise: Promise<T>, scheduler: Scheduler): Observable<T>
 */
//fromPromise();
function fromPromise() {
  // Convert the Promise returned by Fetch to an Observable
  var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
  result.subscribe(x => console.log(x), e => console.error(e));
}