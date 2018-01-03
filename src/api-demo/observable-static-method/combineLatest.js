/**
 * @name combineLatest() 联合多个Observable
 * public static combineLatest(
 * observable1: ObservableInput,
 * observable2: ObservableInput, project: function, scheduler: Scheduler): Observable
 */
// combineLatest();
function combineLatest() {
  // Combine two timer Observables
  const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
  const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
  const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
  combinedTimers.subscribe(value => console.log(value));
  // Logs
  // [0, 0] after 0.5s
  // [1, 0] after 1s
  // [1, 1] after 1.5s
  // [2, 1] after 2s
}
//combineLatest2();
function combineLatest2() {
  // Combine an array of Observables
  const observables = [1, 5, 10].map(
    n => Rx.Observable.of(n).delay(n * 1000).startWith(0) // emit 0 and then emit n after n seconds
  );
  const combined = Rx.Observable.combineLatest(observables);
  combined.subscribe(value => console.log(value));
  // Logs
  // [0, 0, 0] immediately
  // [1, 0, 0] after 1s
  // [1, 5, 0] after 5s
  // [1, 5, 10] after 10s
}
//combineLatest3();
function combineLatest3() {
  // Use project function to dynamically calculate the Body-Mass Index
  var weight = Rx.Observable.of(70, 72, 76, 79, 75);
  var height = Rx.Observable.of(1.76, 1.77, 1.78);
  var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
  bmi.subscribe(x => console.log('BMI is ' + x));

  // With output to console:
  // BMI is 24.212293388429753
  // BMI is 23.93948099205209
  // BMI is 23.671253629592222
}