
/** 
 * @name distinct 去除重复的
 * public distinct(keySelector: function, flushes: Observable): Observable
 */
//distinct();
function distinct() {
    //A simple example with numbers
    Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
        .distinct()
        .subscribe(x => console.log(x)); // 1, 2, 3, 4
}
//distinct2();
function distinct2() {
    //An example using a keySelector function

    Observable.of(
        { age: 4, name: 'Foo' },
        { age: 7, name: 'Bar' },
        { age: 5, name: 'Foo' })
        .distinct(p => p.name)
        .subscribe(x => console.log(x));

    // displays:
    // { age: 4, name: 'Foo' }
    // { age: 7, name: 'Bar' }
}
/** 
 * @name distinctUntilKeyChanged 去除重复的直到key改变
 * public distinctUntilKeyChanged(key: string, compare: function): Observable
 */
// distinctUntilKeyChanged();
function distinctUntilKeyChanged() {
    //An example comparing the name of persons
    Observable.of(
        { age: 4, name: 'Foo' },
        { age: 7, name: 'Bar' },
        { age: 5, name: 'Foo' },
        { age: 6, name: 'Foo' })
        .distinctUntilKeyChanged('name')
        .subscribe(x => console.log(x));

    // displays:
    // { age: 4, name: 'Foo' }
    // { age: 7, name: 'Bar' }
    // { age: 5, name: 'Foo' }
}