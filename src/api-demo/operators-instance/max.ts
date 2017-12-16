import { Observable } from 'rxjs/Rx'
/** 
 * @name max complete时发射最大的值
 * public max(comparer: Function): Observable
 */
//max();
function max() {
  //Get the maximal value of a series of numbers
  Observable.of(5, 4, 7, 2, 8)
    .max()
    .subscribe(x => console.log(x)); // -> 8
}
// max2();
function max2() {
  //Use a comparer function to get the minimal item
  interface Person {
    age: number,
    name: string
  }
  Observable.of<Person>({ age: 7, name: 'Foo' },
    { age: 5, name: 'Bar' },
    { age: 9, name: 'Beer' })
    .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
    .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
}