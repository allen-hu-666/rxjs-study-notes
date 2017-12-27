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
let end$ = Observable.fromEvent(document, "touchend", { passive: false });
let move$ = Observable.fromEvent(document, "touchmove", { passive: false })
    .do(e => {
        e.preventDefault();
        e.stopPropagation();
    });
for (let i = 0, l = iconImgSrcs.length; i < l; i++) {

    icons.push(new IconClass(contentEl, iconImgSrcs[i]));
    icons[i].position(i);
    let start$ = Observable.fromEvent(icons[i]._imgContent, "touchstart", { passive: false });

    let longTap$ = start$
        .merge(move$, end$, 2)
        .debounceTime(1000)
        .filter(e => e.type === 'touchstart')
        .do(e => {
            icons[i].setActive();
        });
    let newStart$ = longTap$.map(e => {
        let offset = icons[i].getOffset();
        return {
            x: e.changedTouches[0].clientX - offset.x,
            y: e.changedTouches[0].clientY - offset.y,
        }
    });
    newStart$.mapTo(move$.takeUntil(end$).merge(end$.do(e => {
        icons[i].unActive();
    }).take(1)))
        .concatAll()
        .withLatestFrom(newStart$, (move, start) => {
            return {
                x: move.changedTouches[0].clientX - start.x,
                y: move.changedTouches[0].clientY - start.y
            }
        })
        .subscribe(res => {
            //console.log(res);
            icons[i].moveIcon(res.x, res.y)
        });
}