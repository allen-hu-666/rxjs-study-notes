/** 
 * @name delay延时发射
 * public delay(delay: number | Date, scheduler: Scheduler): Observable
 */
//delay();
function delay() {
    //Delay each click by one second
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
    delayedClicks.subscribe(x => console.log(x));
}
//delay2();
function delay2() {
    //Delay all clicks until a future date happens
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var date = new Date('March 15, 2050 12:00:00'); // in the future
    var delayedClicks = clicks.delay(date); // click emitted only after that date
    delayedClicks.subscribe(x => console.log(x));
}

/** 
 * @name delayWhen延时发射
 * public delayWhen(delayDurationSelector: function(value: T): Observable, subscriptionDelay: Observable): Observable
 */
//delayWhen();
function delayWhen() {
    //Delay each click by a random amount of time, between 0 and 5 seconds
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var delayedClicks = clicks.delayWhen(event =>{
        var delayDuration = Math.random() * 5000;
        console.log(delayDuration);
        return Rx.Observable.interval(delayDuration)
    }
    );
    delayedClicks.subscribe(x => console.log(x));
}