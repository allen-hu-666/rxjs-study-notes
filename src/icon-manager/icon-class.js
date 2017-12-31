// @ts-check
export let prefix = function () {
    var div = document.createElement('div');
    var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
    div.style.cssText = cssText;
    var style = div.style;
    if (style.webkitTransition) {
        return 'WebkitTransform';
    }
    if (style.MozTransition) {
        return 'MozTransform';
    }
    if (style.oTransition) {
        return 'oTransform';
    }
    if (style.msTransition) {
        return 'msTransform';
    }
    return 'transform';
}();

const trashRectBottom = document.getElementById("icon-trash-content").getBoundingClientRect().bottom;

export class IconClass {
    constructor(contentEl, iconImgSrc) {
        this.indexX = 0;
        this.indexY = 0;
        this._contentEl = contentEl;
        this.active = false;

        this._iconContent = document.createElement("div");
        this._iconContent.className = 'icon-content icon-unactive';

        this._shadowEl = document.createElement("div");
        this._shadowEl.className = 'icon-shadow';

        this._imgContent = document.createElement("div");
        this._imgContent.className = 'img-content';

        let imgEl = document.createElement("img");
        imgEl.src = iconImgSrc;

        this._imgContent.appendChild(imgEl);
        this._iconContent.appendChild(this._shadowEl);
        this._iconContent.appendChild(this._imgContent);
        this._contentEl.appendChild(this._iconContent);
    }
    setActive() {
        this.active = true;
        this._iconContent.classList.add('icon-active');
        this._iconContent.classList.remove('icon-unactive');
        return this;
    }
    position(index = 0) {
        this.indexX = index % 4;
        this.indexY = Math.floor(index / 4);
        this._moveIconContent(this.indexX, this.indexY);
        return this;
    }
    crush(indexX, indexY) {
        if (indexX === this.indexX && indexY === this.indexY) {
            if (this.indexX < 3) {
                this.indexX++;
            } else {
                this.indexX = 0;
                this.indexY++;
            }
            this._moveIconContent(this.indexX, this.indexY);
            return {
                indexX: this.indexX,
                indexY: this.indexY
            }
        } else {
            return false;
        }
    }
    moveToNext() {
        if (this.indexX < 3) {
            this.indexX++;
        } else {
            this.indexX = 0;
            this.indexY++;
        }
        this._moveIconContent(this.indexX, this.indexY);
    }
    _moveIconContent(indexX, indexY) {
        const x = indexX * 93.5;
        const y = indexY * 93.5;
        this._iconContent.style[prefix] = "translate(" + x + "px," + y + "px)";
    }
    moveIcon(x, y) {
        this._imgContent.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    ifInCrash() {
        return this._imgContent.getBoundingClientRect().top < trashRectBottom;
    }
    moveShadow(indexX, indexY) {
        this._shadowEl.style[prefix] = "translate(" + indexX * 93.5 + "px," + indexY * 93.5 + "px)";
    }
    _getIndexChange(pxChange) {
        const indexChange = Math.floor(pxChange / 93.5);
        if (indexChange === 0 || (pxChange % 93.5) > 80) return false;
        return indexChange;
    }
    complate(indexXChange, indexYChange) {
        this.active = false;
        this._iconContent.classList.remove('icon-active');
        this._iconContent.classList.add('icon-unactive');
        this.indexX += indexXChange;
        this.indexY += indexYChange;
        this._moveIconContent(this.indexX, this.indexY);
        this._shadowEl.style[prefix] = "translate(0px,0px)";
        this._imgContent.style[prefix] = "translate(0px,0px)";
    }
    remove() {
        this._contentEl.removeChild(this._iconContent);
    }
}
IconClass.ICON_MARGIN = 6.75;
IconClass.ICON_WIDTH = 80;