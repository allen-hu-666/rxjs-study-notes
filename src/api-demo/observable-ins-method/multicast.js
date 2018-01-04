/** 
 * @name multicast 转化为Subject
 * public multicast(subjectOrSubjectFactory: Function | Subject, selector: Function): Observable
 */
//multicast();
function multicast() {
  //Get the minimal value of a series of numbers
  Rx.Observable.of(5, 4, 7, 2, 8)
    .multicast(() => new Rx.Subject)
    .subscribe(x => console.log(x)); // -> 2
}

//multicast2();
function multicast2() {
  var source = Rx.Observable.interval(1000)
    .take(3)
    .multicast(new Rx.Subject());

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

  source.subscribe(observerA); // subject.subscribe(observerA)

  source.connect(); // source.subscribe(subject)
  /* 
  必须真的等到 执行 connect() 后才会真的用 subject 订阅 source，并开始送出元素，
  如果没有执行 connect() observable 是不会真正执行的。
   */
  setTimeout(() => {
    source.subscribe(observerB); // subject.subscribe(observerB)
  }, 1000);
}

// multicast3();
function multicast3() {
  //这里要退订的话，要把 connect() 回传的 subscription 退订才会真正停止 observable 的执行
  var source = Rx.Observable.interval(1000)
    .do(x => console.log('send: ' + x))
    .multicast(new Rx.Subject()); // 无限的 observable 

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

  var realSubscription = source.connect();

  var subscriptionB;
  setTimeout(() => {
    subscriptionB = source.subscribe(observerB);
  }, 1000);

  setTimeout(() => {
    subscriptionA.unsubscribe();
    subscriptionB.unsubscribe();
    // 这里虽然 A 跟 B 都退订了，但 source 还会继续送元素
  }, 5000);

  setTimeout(() => {
    realSubscription.unsubscribe();
    // 这里 source 才会真正停止送元素
  }, 7000);
}