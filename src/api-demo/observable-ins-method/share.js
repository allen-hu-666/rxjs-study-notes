/** 
 * @name share 另外 publish + refCount 可以在简写成 share
 * 
 */
//share();
function share() {
  var source = Rx.Observable.interval(1000)
    .share();

  // var source = Rx.Observable.interval(1000)
  //             .publish() 
  //             .refCount();

  // var source = Rx.Observable.interval(1000)
  //             .multicast(new Rx.Subject()) 
  //             .refCount();
}