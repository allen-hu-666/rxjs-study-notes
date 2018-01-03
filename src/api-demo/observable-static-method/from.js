/**
 * @name from() 将一个数组、类数组(字符串也可以)，Promise、可迭代对象，类可观察对象、转化为一个Observable
 * public static from(ish: ObservableInput<T>, scheduler: Scheduler): Observable<T>
 */
//from();
function from() {
  // 数组=>Observable
  var array = [10, 20, 30];
  var result = Rx.Observable.from(array);
  result.subscribe(x => console.log(x));
}