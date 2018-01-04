/** 
 * @name publish 
 * public publish(selector: Function): *
 */
//publish();
function publish() {
  // 其实 multicast(new Rx.Subject()) 很常用到，我们有一个简化的写法那就是 publish，下面这两段代码是完全等价的
  // 
  var source = Rx.Observable.interval(1000)
    .publish()
    .refCount();

  // var source = Rx.Observable.interval(1000)
  //             .multicast(new Rx.Subject()) 
  //             .refCount();
}

/** 
 * @name publishBehavior 
 * public publishBehavior(value: *): ConnectableObservable<T>
 */
//publishBehavior();
function publishBehavior() {
  var source = Rx.Observable.interval(1000)
    .publishBehavior(0)
    .refCount();

  // var source = Rx.Observable.interval(1000)
  //             .multicast(new Rx.BehaviorSubject(0)) 
  //             .refCount();
}
/** 
 * @name publishLast 
 * public publishLast(): ConnectableObservable<T>
 */
//publishLast();
function publishLast() {
  // to be added
}
/** 
 * @name publishReplay 
 * public publishReplay(bufferSize: *, windowTime: *, scheduler: *): ConnectableObservable<T>
 */
//publishReplay();
function publishReplay() {
  var source = Rx.Observable.interval(1000)
    .publishReplay(1)
    .refCount();

  // var source = Rx.Observable.interval(1000)
  //             .multicast(new Rx.ReplaySubject(1)) 
  //             .refCount();
}
/** 
 * @name publishLast 
 * public publishLast(): ConnectableObservable<T>
 */
//publishLast();
function publishLast() {
  var source = Rx.Observable.interval(1000)
    .publishLast()
    .refCount();

  // var source = Rx.Observable.interval(1000)
  //             .multicast(new Rx.AsyncSubject(1)) 
  //             .refCount();
}