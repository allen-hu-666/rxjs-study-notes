/** 
 * @name race
 * public race(): Observable
 */
//race();
function race() {
  // to be added
  var clicks = Rx.Observable.of(13, 'click', 123, 12321, 412);
  clicks.race()
    .subscribe(x => console.log(x));
}