/**
 * @name fromEvent() 将事件转化为Observable
 * public static fromEvent(
 * target: EventTargetLike,
 * eventName: string,
 * options: EventListenerOptions,
 * selector: SelectorMethodSignature<T>): Observable<T>
 */
//fromEvent();
function fromEvent() {
  // Emits clicks happening on the DOM document
  var clicks = Rx.Observable.fromEvent(document, 'click');
  clicks.subscribe(x => console.log(x));

  // Results in:
  // MouseEvent object logged to console everytime a click
  // occurs on the document.
}

/**
 * @name fromEventPattern() 将自定义事件转化为Observable
 * public static fromEventPattern(
 * addHandler: function(handler: Function): any,
 * removeHandler: function(handler: Function, signal?: any): void,
 * selector: function(...args: any): T): Observable<T>
 */
//fromEventPattern();
function fromEventPattern() {
  // Emits clicks happening on the DOM document
  function addClickHandler(handler) {
    document.addEventListener('click', handler);
  }

  function removeClickHandler(handler) {
    document.removeEventListener('click', handler);
  }

  var clicks = Rx.Observable.fromEventPattern(
    addClickHandler,
    removeClickHandler
  );
  clicks.subscribe(x => console.log(x));
}