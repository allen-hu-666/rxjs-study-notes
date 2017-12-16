/** 
 * @name multicast complete时发射最小的值
 * public multicast(subjectOrSubjectFactory: Function | Subject, selector: Function): Observable
 */
//multicast();
function multicast() {
  //Get the minimal value of a series of numbers
  Observable.of(5, 4, 7, 2, 8)
    .min()
    .subscribe(x => console.log(x)); // -> 2
}