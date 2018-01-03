/**
 * @name concat() 连接多个Observable
 * public static concat(input1: ObservableInput, input2: ObservableInput, scheduler: Scheduler): Observable
 */
// concat();
function concat() {
  // Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
  var timer = Rx.Observable.interval(1000).take(4);
  var sequence = Rx.Observable.range(1, 10);
  var result = Rx.Observable.concat(timer, sequence);
  result.subscribe(x => console.log(x));

  // results in:
  // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
}
// concat2();
function concat2() {
  // Concatenate an array of 3 Observables
  var timer1 = Rx.Observable.interval(1000).take(10);
  var timer2 = Rx.Observable.interval(2000).take(6);
  var timer3 = Rx.Observable.interval(500).take(10);
  var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
  result.subscribe(x => console.log(x));

  // results in the following:
  // (Prints to console sequentially)
  // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
  // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
  // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
}
// concat3();
function concat3() {
  //Concatenate the same Observable to repeat it
  const timer = Rx.Observable.interval(1000).take(2);

  Rx.Observable.concat(timer, timer) // concating the same Observable!
    .subscribe(
    value => console.log(value),
    err => { },
    () => console.log('...and it is done!')
    );

  // Logs:
  // 0 after 1s
  // 1 after 2s
  // 0 after 3s
  // 1 after 4s
  // "...and it is done!" also after 4s
}