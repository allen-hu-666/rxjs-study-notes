import { Observable } from 'rxjs/Rx'
/**
 * @name zip() 发出你提供的参数，然后完成。
 * public static zip(observables: *): Observable<R>
 */
//zip();
function zip() {
  // 从不同的源头结合年龄和名称

  let age$ = Observable.of<number>(27, 25, 29);
  let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
  let isDev$ = Observable.of<boolean>(true, true, false);

  Observable
    .zip(age$,
    name$,
    isDev$,
    (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
    .subscribe(x => console.log(x));

  // 输出：
  // { age: 27, name: 'Foo', isDev: true }
  // { age: 25, name: 'Bar', isDev: true }
  // { age: 29, name: 'Beer', isDev: false }
}