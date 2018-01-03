/**
 * @name webSocket() 包装浏览器提供的兼容w3c的WebSocket对象.
 * public static webSocket(urlConfigOrSource: string | WebSocketSubjectConfig): WebSocketSubject
 */
//webSocket();
function webSocket() {
  // 包装浏览器的WebSocket

  let socket$ = Observable.webSocket('ws://localhost:8081');

  socket$.subscribe(
    (msg) => console.log('message received: ' + msg),
    (err) => console.log(err),
    () => console.log('complete')
  );

  socket$.next(JSON.stringify({ op: 'hello' }));
}
//webSocket2();
function webSocket2() {
  // 包装nodejs的WebSocket

  //import { w3cwebsocket } from 'websocket';

  let socket$ = Observable.webSocket({
    url: 'ws://localhost:8081',
    WebSocketCtor: w3cwebsocket
  });

  socket$.subscribe(
    (msg) => console.log('message received: ' + msg),
    (err) => console.log(err),
    () => console.log('complete')
  );

  socket$.next(JSON.stringify({ op: 'hello' }));
}