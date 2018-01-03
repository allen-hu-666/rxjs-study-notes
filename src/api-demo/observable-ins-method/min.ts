import { Observable } from 'rxjs/Rx'
/** 
 * @name min complete时发射最小的值
 * public min(comparer: Function): Observable<R>
 */
//min();
function min() {
  //Get the minimal value of a series of numbers
  Observable.of(5, 4, 7, 2, 8)
    .min()
    .subscribe(x => console.log(x)); // -> 2
}
// min2();
function min2() {
  //Use a comparer function to get the minimal item
  interface Person {
    age: number,
    name: string
  }
  Observable.of<Person>({ age: 7, name: 'Foo' },
    { age: 5, name: 'Bar' },
    { age: 9, name: 'Beer' })
    .min<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
    .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
}
