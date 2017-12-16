/** 
 * @name multicast 多播
 * public multicast(subjectOrSubjectFactory: Function | Subject, selector: Function): Observable
 */
//multicast();
function multicast() {
  //Get the minimal value of a series of numbers
  Rx.Observable.of(5, 4, 7, 2, 8)
    .multicast(()=> new Rx.Subject)
    .subscribe(x => console.log(x)); // -> 2
}