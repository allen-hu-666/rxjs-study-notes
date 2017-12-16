import Rx from 'rxjs';

//start()

function start() {
    var observable = Rx.Observable.interval(1000);//1秒钟后才执行
    var subscription = observable.subscribe(x => console.log(x));
    // Later:
    // This cancels the ongoing Observable execution which
    // was started by calling subscribe with an Observer.
    //subscription.unsubscribe();
    setTimeout(() => {
        // Unsubscribes BOTH subscription and childSubscription
    subscription.unsubscribe();
    }, 8000);
}
//mergeSubscription()
function mergeSubscription() {
    var observable1 = Rx.Observable.interval(400);
    var observable2 = Rx.Observable.interval(300);
    var subscription = observable1.subscribe(x => console.log('first: ' + x));
    var childSubscription = observable2.subscribe(x => console.log('second: ' + x));
    subscription.add(childSubscription);

    setTimeout(() => {
    // Unsubscribes BOTH subscription and childSubscription
    subscription.unsubscribe();
    }, 10000);
    ///订阅也有一个remove(otherSubscription)方法,用于解除被add添加的子订阅
}