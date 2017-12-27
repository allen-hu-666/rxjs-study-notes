// @ts-check
import './icon-manager.scss';
import { Observable } from 'rxjs/Rx';
import { IconClass } from './icon-class.js';

const iconImgSrcs = [
    './assets/Books.png',
    './assets/Browser.png',
    './assets/Calculator.png',
    './assets/Movie Studio.png',
    './assets/Camera.png',
    './assets/YouTube.png',
    './assets/Settings.png',
    './assets/Phone.png',
    './assets/Music.png',
    './assets/GMail.png',
];
let icons = [];
let contentEl = document.getElementById("icon-manager-content");
let $end = Observable.fromEvent(document, "touchend", { passive: false });
let $move = Observable.fromEvent(document, "touchmove", { passive: false })
    .do(e => {
        e.preventDefault();
        e.stopPropagation();
    })
    /*.map(e => {
        return {
            startX: 0,
            startY: 0,
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        }
    })*/
    .takeUntil($end);
for (let i = 0, l = iconImgSrcs.length; i < l; i++) {
    icons.push(new IconClass(contentEl, iconImgSrcs[i]));
    icons[i].position(i);
    let start$ = Observable.fromEvent(icons[i]._imgEl, "touchstart", { passive: false })
    .map(e=>{
        let offset = icons[i].getOffset();
        //console.log(offset);
        return {
            x: e.changedTouches[0].clientX- offset.x,
            y: e.changedTouches[0].clientY- offset.y,
        }
    });
    start$.mapTo($move)
        .concatAll()
        .withLatestFrom(start$, (move, start) => {
            //console.log(start.target.style.);
            return {
                x: move.changedTouches[0].clientX - start.x,
                y: move.changedTouches[0].clientY - start.y
            }
        })
        .subscribe(res => {
            //console.log(res);
            icons[i].changeImg(res.x, res.y)
        })
}