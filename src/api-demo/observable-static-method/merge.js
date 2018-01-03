/**
 * @name merge() 通过把多个 Observables 的值混合到一个 Observable 中来将其打平
 * 
 * merge 订阅每个给定的输入 Observable (作为参数)，然后只是将所有输入 Observables 的所有值发 送
 * (不进行任何转换)到输出 Observable 。所有的输入 Observable 都完成了，输出 Observable 才 能完成。
 * 任何由输入 Observable 发出的错误都会立即在输出 Observalbe 上发出。
 * 
 * public static merge(observables: ...ObservableInput, concurrent: number, scheduler: Scheduler): Observable
 */
//merge();
function merge() {
  // 合并两个 Observables: 时间间隔为1秒的 timer 和 clicks
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var timer = Rx.Observable.interval(1000);
  var clicksOrTimer = Rx.Observable.merge(clicks, timer);
  clicksOrTimer.subscribe(x => console.log(x));

  // 结果如下:
  // 每隔1s发出一个自增值到控制台
  // document被点击的时候MouseEvents会被打印到控制台
  // 因为两个流被合并了，所以你当它们发生的时候你就可以看见.
}
//merge2();
function merge2() {
  // 合并3个Observables, 但是只并行运行2个
  var timer1 = Rx.Observable.interval(1000).take(10);
  var timer2 = Rx.Observable.interval(2000).take(6);
  var timer3 = Rx.Observable.interval(500).take(10);
  var concurrent = 2; // the argument
  var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
  merged.subscribe(x => console.log(x));

  // 结果如下:
  // - timer1和timer2将会并行运算
  // - timer1每隔1s发出值，迭代10次
  // - timer2每隔1s发出值，迭代6次
  // - timer1达到迭代最大次数,timer2会继续，timer3开始和timer2并行运行
  // - 当timer2达到最大迭代次数就停止，timer3将会继续每隔500ms发出数据直到结束
}