/** 
 * @name ignoreElements 忽略所有发射，处理complete和error
 * public ignoreElements(): Observable*/
//ignoreElements();
function ignoreElements() {
  var interval = Rx.Observable.of(1, 2, 3, 4, 5);
  var result = interval.ignoreElements();
  var observer = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification ')
  };
  result.subscribe(observer);
}