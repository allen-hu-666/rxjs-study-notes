/** 
 * @name materialize 将错误转化为正常发射的对象
 * public materialize(): Observable<Notification<T>>
 */
//materialize();
function materialize() {
  //Convert a faulty Observable to an Observable of Notifications
  var letters = Rx.Observable.of('a', 'b', 13, 'd');
  var upperCase = letters.map(x => x.toUpperCase());
  var materialized = upperCase.materialize();
  materialized.subscribe(x => console.log(x));

  // Results in the following:
  // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
  // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
  // - Notification {kind: "E", value: undefined, error: TypeError:
  //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
  //   [as project] (http://1…, hasValue: false}
}