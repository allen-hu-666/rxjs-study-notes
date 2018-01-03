/** 
 * @name sample 根据另一个可观察对象的发射发射最新的值，其他值忽略
 * public sample(notifier: Observable<any>): Observable<T>
 */
//sample();
function sample() {
  // On every click, sample the most recent "seconds" timer
  var seconds = Rx.Observable.interval(1000);
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var result = seconds.sample(clicks);
  result.subscribe(x => console.log(x));
}
/** 
 * @name sampleTime 隔一段时间发射最新的值，其他值忽略
 * public sampleTime(period: number, scheduler: Scheduler): Observable<T>
 */
//sampleTime();
function sampleTime() {
  // Every second, emit the most recent click at most once
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var result = clicks.sampleTime(1000);
  result.subscribe(x => console.log(x));
}