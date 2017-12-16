import Rx from 'rxjs';
/**
 * @name  实例操作符，每个 实例操作符都会返回一个新的Observable；
 */
//test1();
function test1() {
    function multiplyByTen(input) {
        var output = Rx.Observable.create(function (observer) {
            input.subscribe({
                next: (v) => observer.next(10 * v),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
        return output;
    }
    var input = Rx.Observable.from([1, 2, 3, 4]);
    var output = multiplyByTen(input);
    output.subscribe(x => console.log(x));

    //这个是实例操作符
    Rx.Observable.prototype.multiplyByTen = function () {
        var input = this;
        return Rx.Observable.create(function subscribe(observer) {
            input.subscribe({
                next: (v) => observer.next(10 * v),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
    }
}
/**
 * @name subscribe 实例操作符，每个subscribe都会返回一个新的Observable；
 */
//test2();
function test2() {

}