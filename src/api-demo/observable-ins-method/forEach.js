/** 
 * @name forEach 类似do()，但返回的是一个promise
 * public forEach(next: Function, PromiseCtor: PromiseConstructor): Promise
 */
//forEach();
function forEach() {
  // 类似do()，但返回的是一个promise，a promise that either resolves on observable completion or rejects with the handled error
  var interval = Rx.Observable.interval(1000).take(6);
  var promise = interval.forEach(data=>{
    console.log(data);
  });
  promise.then(x => console.log(x));
}