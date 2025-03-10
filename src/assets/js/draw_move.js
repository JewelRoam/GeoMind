class chart {
    // 初始构造器
    constructor(params) {
      this.wrapDom = params.el;
      var wrapDomStyle = getComputedStyle(params.el);
      this.width = parseInt(wrapDomStyle.width, 10);
      this.height = parseInt(wrapDomStyle.height, 10);
  
      // 创建canvas画布
      
      // this.El = document.createElement('canvas');
      // this.El.height = this.height;
      // this.El.width = this.width;
      this.ctx = this.El.getContext('2d');
  
      params.el.appendChild(this.El);
      
      // 因为canvas是基于状态绘制的，也就是设置了缩放值
      // 再绘制的元素才会根据缩放倍数绘制，因此需要把每个绘制的对象保存起来。
      this.data = [];
      this.scale = 1; // 默认缩放值是 1
  
      // 缩放具体实现会用到，下面会讲，现在可以不看
      this.maxScale = 3; // 最大缩放值
      this.minScale = 1; // 最小缩放值
      this.step = 0.1;   // 缩放率
      this.offsetX = 0;  // 画布X轴偏移值
      this.offsetY = 0;  // 画布Y轴偏移值
      
      // 添加滚轮判断事件
        this.addScaleFunc();
  
      // 添加拖拽事件
      this.addDragFunc();
    }
    
    // 添加缩放功能，判断时机注册移除MouseWhell事件
    addScaleFunc() {
      this.El.addEventListener('mouseenter', this.addMouseWhell);
      this.El.addEventListener('mouseleave', this.removeMouseWhell);
    }
  
    // 添加 mousewhell 事件
    addMouseWhell = () => {
      document.addEventListener('mousewheel', this.scrollFunc, {passive: false});
    }
  
    // 移除mousewhell 事件
    removeMouseWhell = () => {
      document.removeEventListener('mousewheel', this.scrollFunc, {passive: false});
    }
  
    // 缩放具体实现
    scrollFunc = (e) => {
      // 阻止默认事件 （缩放时外部容器禁止滚动）
      e.preventDefault();
  
      if(e.wheelDelta){
        var x = e.offsetX - this.offsetX
        var y = e.offsetY - this.offsetY
  
        var offsetX = (x / this.scale) * this.step
        var offsetY = (y / this.scale) * this.step
  
        if(e.wheelDelta > 0){
          this.offsetX -= this.scale >= this.maxScale ? 0 : offsetX
          this.offsetY -= this.scale >= this.maxScale ? 0 : offsetY
  
          this.scale += this.step
        } else {
          this.offsetX += this.scale <= this.minScale ? 0 : offsetX
          this.offsetY += this.scale <= this.minScale ? 0 : offsetY
  
          this.scale -= this.step
        }
  
        this.scale = Math.min(this.maxScale, Math.max(this.scale, this.minScale))
      
        this.render()
      }
    }
    
    // 添加拖拽功能，判断时机注册移除 拖拽 功能
    addDragFunc() {
      this.El.addEventListener('mousedown', this.addMouseMove);
      document.addEventListener('mouseup', this.removeMouseMove);
    }
  
    // 添加鼠标移动 功能，获取保存当前点击坐标
    addMouseMove = (e) => {
      this.targetX = e.offsetX
      this.targetY = e.offsetY
  
      this.mousedownOriginX = this.offsetX;
      this.mousedownOriginY = this.offsetY;
      
      this.wrapDom.style.cursor = 'grabbing'
      this.El.addEventListener('mousemove', this.moveCanvasFunc, false)
    }
  
    // 移除鼠标移动事件
    removeMouseMove = () => {
      this.wrapDom.style.cursor = ''
      this.El.removeEventListener('mousemove', this.moveCanvasFunc, false)
      this.El.removeEventListener('mousemove', this.moveShapeFunc, false)
    }
  
    // 移动画布
    moveCanvasFunc = (e) => {
      // 获取 最大可移动宽
      var maxMoveX = this.El.width / 2;
      var maxMoveY = this.El.height / 2;
      
      var offsetX = this.mousedownOriginX + (e.offsetX - this.targetX);
      var offsetY = this.mousedownOriginY + (e.offsetY - this.targetY);
  
      this.offsetX = Math.abs(offsetX) > maxMoveX ? this.offsetX : offsetX
      this.offsetY = Math.abs(offsetY) > maxMoveY ? this.offsetY : offsetY
      
      this.render()
    }
  
    // 绘制圆形
    drawCircle(data) {
      this.ctx.beginPath();
      this.ctx.fillStyle = data.fillStyle;
      this.ctx.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    
    // 绘制线条方法 
    drawLine(data) {
      var arr = data.data.concat()
      var ctx = ctx || this.ctx;  
  
      ctx.beginPath()
      ctx.moveTo(arr.shift(), arr.shift())
      ctx.lineWidth = data.lineWidth || 1
      do{
        ctx.lineTo(arr.shift(), arr.shift());
      } while (arr.length)
  
      ctx.stroke();
    }
    
    //  绘制矩形方法 
    drawRect(data) {
      this.ctx.beginPath();
      this.ctx.fillStyle = data.fillStyle;
      this.ctx.fillRect(...data.data);
    }
  
    // 渲染整个 图形画布
    render() {
      this.El.width = this.width;
  
      this.data.forEach(item => {
        this.draw(item);
      })
    }
  
    // 判断类型绘制的方法 
    draw(item) {
      this.ctx.setTransform(this.scale,0, 0, this.scale, this.offsetX, this.offsetY);
      switch(item.type){
        case 'line':
          this.drawLine(item)
          break;
        case 'rect':
          this.drawRect(item)
          break;
        case 'circle':
          this.drawCircle(item)
          break;
      }
    }
    
    // 添加形状
    push(data) {
      this.data.push(data);
      this.draw(data);
    }
  }
  

  export default chart
  // 构建图表对象
//   var chartObj = new chart( { el: document.getElementById('chart-wrap') } );
  
//   // 绘制圆形
//   chartObj.push({
//     type: 'circle',
//     fillStyle: 'pink',
//     x: 400,
//     y: 300,
//     r: 50
//   });
  
//   //  绘制线条 
//   chartObj.push({
//     type: 'line',
//     lineWidth: 4,
//     data: [100, 90, 200, 90, 250, 200, 400, 200]
//   })
  
//   //  绘制矩形 
//   chartObj.push({
//     type: 'rect',
//     fillStyle: "#0f00ff",
//     data: [350, 400, 100, 100]
//   })