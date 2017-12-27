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
        this._contentEl = contentEl;
        this.active = false;

        this._iconContent = document.createElement("div");
        this._iconContent.className = 'icon-content';

        this._shadowEl = document.createElement("div");
        this._shadowEl.className = 'icon-shadow';

        this._imgEl = document.createElement("img");
        this._imgEl.src = iconImgSrc;

        this._iconContent.appendChild(this._shadowEl);
        this._iconContent.appendChild(this._imgEl);
        this._contentEl.appendChild(this._iconContent);
        /*this._imgEl.addEventListener("click",e=>{
            if(this.active) {
                this.unActive();
            }else{
                this.setActive();
            }
        })*/
        this.imgX = 0;
        this.imgY = 0;
    }
    setActive() {
        this.active = true;
        this._imgEl.style[prefix] = "scale(1.2)";
        return this;
    }
    unActive() {
        this.active = false;
        this._imgEl.style[prefix] = "scale(1.0)";
        return this;
    }
    position(index = 0) {
        const x = index % 4 * 93.5;
        const y = Math.floor(index / 4) * 93.5;
        this.updateEl(x, y)
        return this;
    }
    updateEl(x, y) {
        this._iconContent.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    changeImg(x,y) {
        this.imgX += x;
        this.imgY += y;
        this._imgEl.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    getOffset() {
        let imgRect = this._imgEl.getBoundingClientRect();
        let contentRect = this._iconContent.getBoundingClientRect();
        return {
            y:imgRect.top - contentRect.top,
            x:imgRect.left - contentRect.left
        }
    }
    remove() {
        this._contentEl.removeChild(this._iconContent);
        return this;
    }
}
IconClass.ICON_MARGIN = 6.75