# rxjs-study-notes
rxjs的学习笔记，主要包含了rxjs的各种api demo和一个rxjs写的安卓图标管理器

### 项目运行步骤
项目用webpack打包
1. git clone https://github.com/elon-hu/rxjs-study-notes.git
2. cd rxjs-study-notes
3. npm install
4. npm start
5. 此时会启动一个serve，并打开浏览器

### 安卓图标管理器
* 源码在src/ionc-manager
* 着重看icon-manager里面的代码
* icon-class是对ionc所有dom操作的封装，因为如果在rxjs操作符里直接操作dom会比较繁琐
* 大家可以到[https://elon-hu.github.io/rxjs-study-notes/](https://elon-hu.github.io/rxjs-study-notes/) 观看效果
* 目前只支持移动端，但可以用chrome的F12开发模式下的phone模式体验

### rxjs api demo
* 里面包含了几乎所有的官方demo，以及从其它地方搜集的demo
* 默认这些demo的方法是没有被执行的，去掉注释即可执行，方便大家实践rxjs的api

``` javascript
/** 
 * @name map映射流的值
 * public map(project: function(value: T, index: number): R, thisArg: any): Observable<R>
 */
//map(); // 去掉map()的注释即可运行
function map() {
    //Map every every click to the clientX position of that click
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var positions = clicks.map(ev => ev.clientX);
    positions.subscribe(x => console.log(x));
}
```