/** 
 * @name refCount 必须搭配 multicast 一起使用，他可以建立一个只要有订阅就会自动 connect 的 observable
 * public refCount(): Observable
 */
//refCount();
function refCount() {
  /* 
  上面这段代码，当 source 一被 observerA 订阅时(订阅数从 0 变成 1)，就会立即执行并发送元素，我们就不需要再额外执行 connect。
  同样的在退订时只要订阅数变成 0 就会自动停止发送
  */
  var source = Rx.Observable.interval(1000)
    .do(x => console.log('send: ' + x))
    .take(5)
    .multicast(new Rx.Subject())
    .refCount();

  var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
  }

  var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
  }

  var subscriptionA = source.subscribe(observerA);
  // 订阅数 0 => 1

  var subscriptionB;
  setTimeout(() => {
    subscriptionB = source.subscribe(observerB);
    // 订阅数 0 => 2
  }, 1000);
}
//refCount2();
function refCount2() {
  var source = Rx.Observable.interval(1000)
    .do(x => console.log('send: ' + x))
    .multicast(new Rx.Subject())
    .refCount();

  var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
  }

  var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
  }

  var subscriptionA = source.subscribe(observerA);
  // 订阅数 0 => 1

  var subscriptionB;
  setTimeout(() => {
    subscriptionB = source.subscribe(observerB);
    // 订阅数 0 => 2
  }, 1000);

  setTimeout(() => {
    subscriptionA.unsubscribe(); // 订阅数 2 => 1
    subscriptionB.unsubscribe(); // 订阅数 1 => 0，source 停止发送元素
  }, 5000);
}