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

const trashEl = document.getElementById("icon-trash-content");

/*获取回收箱底部的位置*/
const trashRectBottom = trashEl.getBoundingClientRect().bottom;

/* 转化touchend为可观察对象 */
const end$ = Observable.fromEvent(document, "touchend", { passive: false });
/* 转化touchmove为可观察对象 */
const move$ = Observable.fromEvent(document, "touchmove", { passive: false }).do(e => {
    e.preventDefault();
    e.stopPropagation();
});

for (let i = 0, l = iconImgSrcs.length; i < l; i++) {
    /* 创建icon对象 */
    const icon = new IconClass(iconImgSrcs[i]);
    icons.push(icon);

    icon.position(i); // 初始化icon的位置

    /* 转化icon各自的touchstart为可观察对象 */
    const start$ = Observable.fromEvent(icon._imgContent, "touchstart", { passive: false });
    /*封装成长按1秒事件*/
    const longTap$ = start$
        .merge(move$, end$, 2)
        .debounceTime(1000)
        .filter(e => e.type === 'touchstart')
        .do(e => {
            icon.setActive();
            trashEl.classList.add('trash-display');
        })
        .map(e => {
            const iconRect = icon.getIconBoundingClientRect();
            return {
                maxX: 404 - iconRect.right,
                minX: 30 - iconRect.left,
                maxY: 760 - iconRect.bottom,
                minY: 100 - iconRect.top,
                clientX: e.changedTouches[0].clientX,
                clientY: e.changedTouches[0].clientY,
            }
        });
    /*封装成icon移动事件*/
    const iconMove$ = longTap$.mapTo(move$.takeUntil(end$))
        .concatAll()
        .withLatestFrom(longTap$, (move, start) => {
            let xChange = move.changedTouches[0].clientX - start.clientX;
            let yChange = move.changedTouches[0].clientY - start.clientY;
            xChange = xChange < start.minX ? start.minX : xChange;
            xChange = xChange > start.maxX ? start.maxX : xChange;
            yChange = yChange < start.minY ? start.minY : yChange;
            yChange = yChange > start.maxY ? start.maxY : yChange;
            return {
                x: xChange,
                y: yChange
            }
        });
    /*封装成icon的网格坐标改变事件*/
    const indexChange$ = iconMove$
        .do(res => icon.moveIcon(res.x, res.y))
        .filter(res => {
            const overX = Math.abs(res.x) % 93.5;
            const overY = Math.abs(res.y) % 93.5;
            const xRight = overX < 30 || overX > 63.5;
            const yRight = overY < 30 || overY > 63.5;
            return xRight && yRight;
        })
        .map(res => {
            return {
                indexChangeX: Math.floor((res.x + 40) / 93.5),
                indexChangeY: Math.floor((res.y + 40) / 93.5)
            }
        })
        .distinctUntilChanged((p, q) => {
            const noXChange = p.indexChangeX === q.indexChangeX;
            const noYChange = p.indexChangeY === q.indexChangeY;
            return noXChange && noYChange;
        })
        .do(res => {
            icon.moveShadow(res.indexChangeX, res.indexChangeY);
            crushOtherIcon(icon.indexX + res.indexChangeX, icon.indexY + res.indexChangeY);
        })
        .merge(Observable.of({
            indexChangeX: 0,
            indexChangeY: 0
        }));
    /*封装成移动完成事件，并订阅*/
    const moveSubscription = indexChange$
        .merge(end$)
        .scan((acc, one) => {
            if (one.type !== 'touchend')
                return one;
            if (!!acc.moveEnd) {
                return {
                    moveEnd: true,
                    indexChangeX: 0,
                    indexChangeY: 0
                }
            } else {
                acc.moveEnd = true;
                return acc;
            }
        }, {
            indexChangeX: 0,
            indexChangeY: 0
        })
        .filter(res => res.moveEnd)
        .subscribe(res => {
            icon.complate(res.indexChangeX, res.indexChangeY);
            trashEl.classList.remove('trash-display');
        });
    /*封装成进出回收箱事件*/
    const inTrash$ = iconMove$
        .map(res => icon.getIconBoundingClientRect().top < trashRectBottom)
        .distinctUntilChanged()
        .merge(Observable.of(false))
        .do(ifInCrash => {
            if (ifInCrash) {
                trashEl.classList.add('trash-action');
            } else {
                trashEl.classList.remove('trash-action');
            }
        });
    /*封装成icon丢进回收箱事件，并订阅*/
    const trashSubscription = end$
        .withLatestFrom(inTrash$, (end, ifInCrash) => {
            return ifInCrash
        })
        .filter(ifInCrash => ifInCrash)
        .subscribe(res => {
            trashEl.classList.remove('trash-action');
            trashEl.classList.remove('trash-display');
            icon.remove();
            icons.splice(i, 1);
            moveSubscription.unsubscribe();
            trashSubscription.unsubscribe();
        })
}

/* 当icon移动到某个位置的时候，找出该位置的icon以及后面的icon，移动它们到下一格 */
function crushOtherIcon(indexX, indexY) {
    let relationIcons = [];
    findRelationIcon(indexX, indexY);
    function findRelationIcon(indexX, indexY) {
        let found = false;
        for (let icon of icons) {
            if (!!icon.active) continue;
            if (indexX === icon.indexX && indexY === icon.indexY) {
                relationIcons.push(icon);
                found = true;
                break;
            }
        }
        if (!found) return;
        if (indexX < 3) {
            indexX++;
        } else {
            indexX = 0;
            indexY++;
        }
        findRelationIcon(indexX, indexY)
    }
    relationIcons.forEach(icon => icon.moveToNext());
}

/*禁止右键菜单*/
document.oncontextmenu = function (e) {
    return e.returnValue = false
};
