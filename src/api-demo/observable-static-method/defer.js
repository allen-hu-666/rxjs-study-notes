/**
 * @name defer() 惰性创建 Observable, 也就是说, 当且仅当它被订阅的时候才创建
 * public static defer(observableFactory: function(): SubscribableOrPromise): Observable
 */
//defer();
function defer() {
  // 随机订阅点击或者 interval Observable
  var clicksOrInterval = Rx.Observable.defer(function () {
    if (Math.random() > 0.5) {
      return Rx.Observable.fromEvent(document, 'click');
    } else {
      return Rx.Observable.interval(1000);
    }
  });
  clicksOrInterval.subscribe(x => console.log(x));

  // 结果如下:
  // 如果Math.random()返回的值大于0.5，它会监听"document"上的点击事件; 当document
  // 被点击，它会将点击事件对象打印到控制台。 如果结果小于0.5它会每秒发出一个从0开始自增数。
}