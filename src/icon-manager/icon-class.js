// @ts-check

/* 获取Transition前缀 */
export const prefix = function () {
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
    /** 
     * @constructor
     * @param {string} iconImgSrc icon图片的url地址
     */
    constructor(iconImgSrc) {
        this.indexX = 0; // icon的X网格坐标
        this.indexY = 0; // icon的Y网格坐标
        this._contentEl = document.getElementById("icon-manager-content");
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
    getImgEl() {
        return this._imgContent;
    }
    /** 
     * 激活icon的移动状态
     * 
     * @public 
     * @return {IconClass}
     */
    setActive() {
        this.active = true;
        this._iconContent.classList.add('icon-active');
        this._iconContent.classList.remove('icon-unactive');
        return this;
    }
    /** 
     * 根据icon的初始index定位icon
     * 
     * @public 
     * @param {number} index 初始index
     * @return {IconClass}
     */
    position(index = 0) {
        this.indexX = index % 4;
        this.indexY = Math.floor(index / 4);
        this._moveIconContent(this.indexX, this.indexY);
        return this;
    }
    /** 
     * 移动这个icon到下一格
     * 
     * @public 
     * @returns {IconClass}
     */
    moveToNext() {
        if (this.indexX < 3) {
            this.indexX++;
        } else {
            this.indexX = 0;
            this.indexY++;
        }
        this._moveIconContent(this.indexX, this.indexY);
        return this;
    }
    /** 
     * 根据坐标移动icon
     * 
     * @private 
     * @param {number} indexX X网格坐标
     * @param {number} indexY Y网格坐标
     */
    _moveIconContent(indexX, indexY) {
        const x = indexX * 93.5;
        const y = indexY * 93.5;
        this._iconContent.style[prefix] = "translate(" + x + "px," + y + "px)";
    }
    /** 
     * 根据坐标移动icon的图片
     * 
     * @public 
     * @param {number} x X网格坐标
     * @param {number} y Y网格坐标
     */
    moveIcon(x, y) {
        this._imgContent.style[prefix] = "translate(" + x + "px," + y + "px)";
        return this;
    }
    /** 
     * 获取icon图片的定位
     * 
     */
    getIconBoundingClientRect() {
        return this._imgContent.getBoundingClientRect()
    }
    /** 
     * 根据坐标移动icon的阴影
     * 
     * @public 
     * @param {number} x X坐标
     * @param {number} y Y坐标
     */
    moveShadow(indexX, indexY) {
        this._shadowEl.style[prefix] = "translate(" + indexX * 93.5 + "px," + indexY * 93.5 + "px)";
    }
    /** 
     * 根据坐标变化计算网格坐标变化
     * 
     * @private 
     * @param {number} pxChange 移动的坐标
     * @returns {number} indexChange icon网格坐标
     */
    _getIndexChange(pxChange) {
        const indexChange = Math.floor(pxChange / 93.5);
        if (indexChange === 0 || (pxChange % 93.5) > 80) return false;
        return indexChange;
    }
    /** 
     * 移动icon完成：移动icon到新位置，取消激活状态
     * 
     * @public 
     * @param {number} indexXChange X网格坐标变化
     * @param {number} indexYChange Y网格坐标变化
     */
    complate(indexXChange, indexYChange) {
        this.indexX += indexXChange;
        this.indexY += indexYChange;
        this._moveIconContent(this.indexX, this.indexY);
        this._shadowEl.style[prefix] = "translate(0px,0px)";
        this._imgContent.style[prefix] = "translate(0px,0px)";
        this.active = false;
        this._iconContent.classList.remove('icon-active');
        setTimeout(() => {
            this._iconContent.classList.add('icon-unactive');
        }, 100)
    }
    /** 
     * 把icon的所有element从dom移除
     * 
     * @public 
     */
    remove() {
        this._contentEl.removeChild(this._iconContent);
    }
}
IconClass.ICON_MARGIN = 6.75;
IconClass.ICON_WIDTH = 80;