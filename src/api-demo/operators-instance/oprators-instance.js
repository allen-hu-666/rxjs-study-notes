import Rx from 'rxjs/Rx';

/**
 * @name 控制流
 */
//window.onload = () => test1();
function test1() {
    //一个或多个值
    // typing "hello world"
    let inputEl = document.getElementById('test-input');
    let buttonEl = document.getElementById('test-button');
    var input = Rx.Observable.fromEvent(inputEl, 'keypress');
    // Filter out target values less than 3 characters long
    input = input.filter(event => event.target.value.length > 2);
    // Delay the events
    input = input.delay(200);
    // Only let through an event every 200 ms
    input = input.throttleTime(200);
    // Let through latest event after 200 ms
    input = input.debounceTime(1000);
    input.subscribe(event => {
        console.log(event.target.value)
    }
    );
    // Stop the stream of events after 3 events
    //input = input.take(3);
    // Passes through events until other observable triggers an event
    var stopStream = Rx.Observable.fromEvent(document.getElementById('test-button'), 'click');
    input = input.takeUntil(stopStream);
    input.subscribe(value => console.log(value)); // "hello" (click)
}

/**
 * @name 控制值
 */
//window.onload = () => test2();
function test2() {
    // typing "hello world"
    var input = Rx.Observable.fromEvent(document.querySelector('input'), 'keypress');
    // Pass on a new value
    input.map(event => event.target.value)
        .subscribe(value => console.log(value)); // "h"
    // Pass on a new value by plucking it
    input.pluck('target', 'value')
        .subscribe(value => console.log(value)); // "h"
    // Pass the two previous values
    input.pluck('target', 'value').pairwise()
        .subscribe(value => console.log(value)); // ["h", "e"]
    // Only pass unique values through
    input.pluck('target', 'value').distinct()
        .subscribe(value => console.log(value)); // "helo wrd"
    // Do not pass repeating values through
    input.pluck('target', 'value').distinctUntilChanged()
        .subscribe(value => console.log(value)); // "helo world"
}

/**
 * @name 保存状态
 */
//window.onload = () => test3();
function test3() {
    var button = document.querySelector('button');
    Rx.Observable.fromEvent(button, 'click')
        // scan (reduce) to a stream of counts

        .scan(count => count + 1, 0)
        // Set the count on an element each time it changes
        .subscribe(count => console.log(count));
}