/** 
 * @name combineAll 等到主Observable完成后
 * public combineAll(project: function): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat
 */
//combineAll();
function combineAll() {
    //Map two click events to a finite interval Observable, then apply combineAll
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var higherOrder = clicks.map(ev =>
        Rx.Observable.interval(Math.random() * 2000).take(10)
    ).take(2);
    var result = higherOrder.combineAll();
    result.subscribe(x => console.log(x));
}


/** 
 * @name combineLatest 它会取得各个 observable 最后送出的值，再输出成一个值
 * public combineLatest(other: ObservableInput, project: function): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat
 */
//combineLatest();
function combineLatest() {
    //Dynamically calculate the Body-Mass Index from an Observable of weight and one for height
    var weight = window.Rx.Observable.of(70, 72, 76, 79, 75);
    var height = window.Rx.Observable.of(1.76, 1.77, 1.78);
    var bmi = weight.combineLatest(height, (w, h) =>{
        console.log(w,h)
        return w / (h * h)
    });
    bmi.subscribe(x => console.log('BMI is ' + x));

    // With output to console:
    // BMI is 24.212293388429753
    // BMI is 23.93948099205209
    // BMI is 23.671253629592222
}
//combineLatest2();
function combineLatest2() {
    var source = Rx.Observable.interval(500).take(3);
    var newest = Rx.Observable.interval(300).take(6);

    var example = source.combineLatest(newest, (x, y) => {
        console.log(x,y);
        return x + y;
    });

    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    // 0
    // 1
    // 2
    // 3
    // 4
    // 5
    // 6
    // 7
    // complete
}