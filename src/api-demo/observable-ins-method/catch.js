/** 
 * @name 捕获错误
 * public catch(selector: function): Observable
 * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-catch
 */
//test();
function test() {
    // Continues with a different Observable when there's an error

    Rx.Observable.of(1, 2, 3, 4, 5)
        .map(n => {
            if (n == 4) {
                throw 'four!';
            }
            return n;
        })
        .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
        .subscribe(x => console.log(x));
    // 1, 2, 3, I, II, III, IV, V
}
//test2();
function test2() {
    //Retries the caught source Observable again in case of error, similar to retry() operator

    Rx.Observable.of(1, 2, 3, 4, 5)
        .map(n => {
            if (n === 4) {
                throw 'four!';
            }
            return n;
        })
        .catch((err, caught) => caught)
        .take(30)
        .subscribe(x => console.log(x));
    // 1, 2, 3, 1, 2, 3, ...
}
//test3();
function test3() {
    Rx.Observable.of(1, 2, 3, 4, 5)
        .map(n => {
            if (n == 4) {
                throw 'four!';
            }
            return n;
        })
        .catch(err => {
            throw 'error in source. Details: ' + err;
        })
        .subscribe(
        x => console.log(x),
        err => console.log(err)
        );
    // 1, 2, 3, error in source. Details: four!
}