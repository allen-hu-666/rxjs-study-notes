/** 
 * @name sequenceEqual 累加器
 * public sequenceEqual(compareTo: Observable, comparor: function): Observable
 */
//sequenceEqual();
function sequenceEqual() {
  // figure out if the Konami code matches
  var code = Rx.Observable.from([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
    "Enter" // no start key, clearly.
  ]);

  var keys = Rx.Observable.fromEvent(document, 'keyup')
    .map(e => e.code);
  var matches = keys.bufferCount(11, 1)
    .mergeMap(
    last11 =>
      Rx.Observable.from(last11)
        .sequenceEqual(code)
    );
  matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
}