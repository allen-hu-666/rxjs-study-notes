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
let $end = Observable.fromEvent(document, "touchend",{ passive: false });
let $move = Observable.fromEvent(document, "touchmove",{ passive: false })
    .do(e => {
        e.preventDefault();
        e.stopPropagation();
    })
    .map(e => {
        return {
            startX: 0,
            startY: 0,
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        }
    }).takeUntil($end);
for (let i = 0, l = iconImgSrcs.length; i < l; i++) {
    icons.push(new IconClass(contentEl, iconImgSrcs[i]));
    icons[i].position(i);
    let $start = Observable.fromEvent(icons[i]._imgEl, "touchstart",{ passive: false })
        .map(e => {
            return {
                startX: e.changedTouches[0].clientX,
                startY: e.changedTouches[0].clientY,
                changeX:0,
                changeY:0
            }
        });
    $start.switchMap(res => {
        //let eve{}
        //console.log(res);
        return $move.scan((acc, one) => {
            //console.log(acc);
            acc.changeX = one.x - acc.startX;
            acc.changeY = one.y - acc.startY;
            return acc
        }, res )
    }).subscribe(res => {
        //console.log(res);
        icons[i].changeImg(res.changeX,res.changeY)
    })
}