/**
 * @name create() 创建一个Observable
 * public static create(onSubscription: function(observer: Observer): TeardownLogic): Observable
 */
//create();
function create() {
  // Emit three numbers, then complete.
  var observable = Rx.Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  });
  observable.subscribe(
    value => console.log(value),
    err => { },
    () => console.log('this is the end')
  );

  // Logs
  // 1
  // 2
  // 3
  // "this is the end"
}
//create2();
function create2() {
  // Emit an error
  const observable = Rx.Observable.create((observer) => {
    observer.error('something went really wrong...');
  });

  observable.subscribe(
    value => console.log(value), // will never be called
    err => console.log(err),
    () => console.log('complete') // will never be called
  );

  // Logs
  // "something went really wrong..."
}
//create3();
function create3() {
  // Return unsubscribe function

  const observable = Rx.Observable.create(observer => {
    const id = setTimeout(() => observer.next('...'), 5000); // emit value after 5s

    return () => { clearTimeout(id); console.log('cleared!'); };
  });

  const subscription = observable.subscribe(value => console.log(value));

  setTimeout(() => subscription.unsubscribe(), 3000); // cancel subscription after 3s

  // Logs:
  // "cleared!" after 3s

  // Never logs "..."
}