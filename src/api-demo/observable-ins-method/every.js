/** 
 * @name every 当complate时所有值是否符合条件
 * public every(predicate: function, thisArg: any): Observable
 */
//every();
function every() {
    // A simple example emitting true if all elements are less than 5, false otherwise
    Observable.of(1, 2, 3, 4, 5, 6)
        .every(x => x < 5)
        .subscribe(x => console.log(x)); // -> false
}