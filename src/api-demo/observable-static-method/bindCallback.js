/**
 * @name bindCallback() 将一个回掉函数转化为Observable
 * public static bindCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable
 */
//bindCallback();
function bindCallback() {
  //Compare behaviour with and without async Scheduler
  function iCallMyCallbackSynchronously(cb) {
    cb();
  }

  const boundSyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously);
  const boundAsyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously, null, Rx.Scheduler.async);

  boundSyncFn().subscribe(() => console.log('I was sync!'));
  boundAsyncFn().subscribe(() => console.log('I was async!'));
  console.log('This happened...');

  // Logs:
  // I was sync!
  // This happened...
  // I was async!
}
/**
 * @name bindNodeCallback() 将一个node风格的回掉函数转化为Observable
 * public static bindNodeCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable
 */
//bindNodeCallback();
function bindNodeCallback() {
  //
}