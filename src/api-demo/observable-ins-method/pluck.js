/** 
 * @name pluck 有点像map 但是它只对{}的值起作用，使用更方便
 * public pluck(properties: ...string): Observable
 */
//pluck();
function pluck() {
  // Map every every click to the tagName of the clicked target element
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var tagNames = clicks.pluck('target', 'tagName');
  /* 类似于 
    var tagNames = clicks.map(el=>el.target.tagName);
  */
  tagNames.subscribe(x => console.log(x));
}