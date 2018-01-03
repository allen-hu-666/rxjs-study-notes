/** 
 * @name pairwise 把相邻的两个发射合并
 * public pairwise(): Observable<Array<T>>
 */
//pairwise();
function pairwise() {
  // On every click (starting from the second), emit the relative distance to the previous click
  var clicks = Rx.Observable.fromEvent(document, 'click');
  var pairs = clicks.pairwise();
  var distance = pairs.map(pair => {
    var x0 = pair[0].clientX;
    var y0 = pair[0].clientY;
    var x1 = pair[1].clientX;
    var y1 = pair[1].clientY;
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
  });
  distance.subscribe(x => console.log(x));
}