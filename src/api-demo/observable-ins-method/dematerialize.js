/** 
 * @name dematerialize延时发射
 * public dematerialize(): Observable
 */
//dematerialize();
function dematerialize() {
    //Convert an Observable of Notifications to an actual Observable
    var notifA = new Rx.Notification('N', 'A');
    var notifB = new Rx.Notification('N', 'B');
    var notifE = new Rx.Notification('E', void 0,
        new TypeError('x.toUpperCase is not a function')
    );
    var materialized = Rx.Observable.of(notifA, notifB, notifE);
    var upperCase = materialized.dematerialize();
    upperCase.subscribe(x => console.log(x), e => console.error(e));

    // Results in:
    // A
    // B
    // TypeError: x.toUpperCase is not a function
}       