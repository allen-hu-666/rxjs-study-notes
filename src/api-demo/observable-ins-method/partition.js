/** 
 * @name partition 有点像filter 但是它是把一个流分成两个流
 * public partition(predicate: function(value: T, index: number): boolean, thisArg: any): [Observable<T>, Observable<T>]
 */
//partition();
function partition() {
  // Partition click events into those on DIV elements and those elsewhere
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
  var clicksOnDivs = parts[0];
  var clicksElsewhere = parts[1];
  clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
  clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
}