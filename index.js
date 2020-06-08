function DragSlide(options) {
    const {el, success} = options;
    this.el = el;
    this.success = success;
    this.init();
    this.bindEvent();

}
DragSlide.prototype.init = function(){
    let slideFont = document.createElement('span');
    let slider = document.createElement('div');
    let modal = document.createElement('div');
    slideFont.className = "slide-font";
    slideFont.innerHTML = "拖动滑动验证";
    slider.innerHTML = ">>";
    slider.className = "slider";
    modal.className = 'modal';
    this.slider = slider;
    this.modal = modal;
    this.slideFont = slideFont;
    this.el.append(slideFont,slider,modal);
}
DragSlide.prototype.bindEvent = function(){
  let that = this;
  that.onmouseDown = function(e){
    that.ofX = e.pageX;
    that.elWidth = parseFloat(getComputedStyle(that.modal).width);
    that.elLeft = parseFloat(getComputedStyle(that.slider).left)
    that.maxLeft = parseFloat(getComputedStyle(that.el).width) - parseFloat(getComputedStyle(that.slider).width)
    that.onMove = function (e){
        that.modalWidth = e.pageX - that.ofX + that.elWidth;
        that.sliderLeft = e.pageX - that.ofX + that.elLeft;
        that.modal.style.width = that.modalWidth + 'px'; // 滑块底层模框绿色宽度
        that.slider.style.left = that.sliderLeft + 'px'; // 滑块的位置
        if (that.sliderLeft >= that.maxLeft){
            that.slider.style.left = that.maxLeft + 'px'; //边界判断 最大值
            that.modal.style.width = + parseFloat(getComputedStyle(that.el).width) + 'px'; //最大宽度 是 外面容器的宽度
            that.slideFont.innerText = "验证成功"; /* 文案变动 */
            that.slideFont.style.color = "#fff"; 
            that.slider.style.fontSize = '20px';
            that.slider.style.cursor = 'initial';
            that.slider.innerHTML = "✅"
            document.removeEventListener('mousemove', that.onMove);
            that.slider.removeEventListener('mousedown', that.onmouseDown);
            that.success();

        }
        if (that.sliderLeft <= 0){
            that.slider.style.left = 0 + 'px'; //边界判断 最大值
            that.modal.style.width = 0 + 'px'; //最大宽度 是 外面容器的宽度
        }
    }
    document.addEventListener('mousemove', that.onMove);

  }
  this.slider.addEventListener('mousedown', that.onmouseDown);

  document.addEventListener('mouseup', function(){
    if (that.sliderLeft < that.maxLeft){
        that.slider.style.left = 0 + 'px'; //回到最初位置
        that.modal.style.width = 0 + 'px';
    }
    document.removeEventListener('mousemove', that.onMove);
  })
}