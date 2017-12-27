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

export class IconClass {
    constructor(contentEl, iconImgSrc) {
        this.index = 0;
        this._contentEl = contentEl;
        this.active = false;

        this._iconContent = document.createElement("div");
        this._iconContent.className = 'icon-content';

        let shadowEl = document.createElement("div");
        shadowEl.className = 'icon-shadow';

        this._imgContent = document.createElement("div");
        this._imgContent.className = 'img-content';

        let imgEl = document.createElement("img");
        imgEl.src = iconImgSrc;

        this._imgContent.appendChild(imgEl);
        this._iconContent.appendChild(shadowEl);
        this._iconContent.appendChild(this._imgContent);
        this._contentEl.appendChild(this._iconContent);
    }
    setActive() {
        this.active = true;
        this._iconContent.classList.add('icon-active');
        return this;
    }
    unActive() {
        this.active = false;
        this._iconContent.classList.remove('icon-active');
        return this;
    }
    complate() {

    }
    position(index = 0) {
        this.index = index;
        const x = index % 4 * 93.5;
        const y = Math.floor(index / 4) * 93.5;
        this.updateEl(x, y)
        return this;
    }
    updateEl(x, y) {
        this._iconContent.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    moveIcon(x, y) {
        this._imgContent.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    getIndex(x, y) {
        // let xIndex = (x%93.5>)
        return this.index;
    }
    getOffset() {
        let imgRect = this._imgContent.getBoundingClientRect();
        let contentRect = this._iconContent.getBoundingClientRect();
        return {
            y: imgRect.top - contentRect.top,
            x: imgRect.left - contentRect.left
        }
    }
    reset() {
        this._imgContent.style[prefix] = "translate(0px,0px)";
    }
    remove() {
        this._contentEl.removeChild(this._iconContent);
        return this;
    }
}
IconClass.ICON_MARGIN = 6.75;
IconClass.ICON_WIDTH = 80;