<template>
  <!-- <UserHead></UserHead> -->
  <!-- 用户标注界面 -->
  <div class="common-layout" style="margin-top: 60px;">
    <el-container class="height">
      <el-aside width="300px" style="background-color:white;">
        <div class="demo-input-suffix">

          <div style="width: 100%;">
            <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
              style="display: block;text-align: center; font-size: larger;">搜索</span>


            <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :suffix-icon="Search"
              style="margin-top: 20px;" />
            <el-scrollbar v-show="isshowline" height="400px">
              <p v-for="item in itemlist" :key="item" class="scrollbar-demo-item" @click="chooseline(item)">{{ item }}</p>
            </el-scrollbar>
            <el-scrollbar v-show="isshowpoint" height="400px">
              <p v-for="item in itemlist" :key="item" class="scrollbar-demo-item" @click="choosepoint(item)">{{ item }}
              </p>
            </el-scrollbar>


          </div>
        </div>
      </el-aside>
      <el-container>

        <el-header style="background-color: black;height: 40px;">
          <button @click="point" style="width: 36px; height: 30px; margin-top: 5px;"><svg viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 20px;height: 20px; margin:  auto 0;">
              <path
                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
                fill="currentColor"></path>
            </svg></button>
          <button @click="line" style="width: 36px; height: 30px; margin-top: 5px;margin-left: 10px; ">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path fill="currentColor" d="M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64z"></path>
            </svg>
          </button>


          <button @click="save" id="save" style="width: 36px; height: 30px; margin-top: 5px;float: right; color:rgb(251, 255, 0)">

            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path fill="currentColor"
                d="M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32z">
              </path>
            </svg>
          </button>

          <button @click="submit" id="submit"
            style="width: 36px; height: 30px; margin-top: 5px;float: right; margin-right: 10px;color: crimson;">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path fill="currentColor"
                d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z">
              </path>
            </svg>
          </button>

        </el-header>


        <el-main style="background-color: white; padding: 0px;position: relative;">


          <canvas ref="canvas" id="canvas" height="1024" width="1024"
            :class="{ 'max-z-index': map, 'min-z-index': canvas }"
            style=" position: absolute; box-shadow: 1px; z-index: 2;">
          </canvas>

          <!-- 画板 -->
          <Map ref="child" :child-variable="parentVariable" @center="handelcenter"
            :class="{ 'max-z-index': canvas, 'min-z-index': map }"
            style="position: absolute; width: 1024px; height: 1024px; z-index: 1;"></Map>








        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import chart from '../assets/js/draw_move'
import { ref } from 'vue'
import { Calendar, List, Search } from '@element-plus/icons-vue'
import { uploadListTypes, useTransitionFallthroughEmits } from 'element-plus'
import Map from '../views/Map.vue'


export default {



  data() {
    return {
      maplist: [],
      isshowline: false,
      isshowpoint: false,
      itemlist: [],
      chooseitem: '',
      bx: 0,
      by: 0,
      ex: 0,
      ey: 0,
      dataUrl: '',
      tiffImage: null,
      posValue: '',
      canvas: false,
      map: true,
      offsetX: 0,
      offsetY: 0,
      Scale: 1,
      x_press: 0,
      y_press: 0,
      prevScale: 1,
      center: [0, 0],
      task_area: [],
      submit_list: [],
      text_task_area: [],
      press_point1: [],
      press_point2: [],
      task_id: 0,




    }
  },
  mounted() {
    this.task_id = this.$route.params.taskId;
    // this.task_id = 17;
    console.log("task_id:", this.task_id);

    axios
      .get('http://10.112.244.193:8000/get/region/', {
        // 传递的参数
        params: {
          task_id: this.task_id,

        },

      }
      ) // 后端图像获取的 URL
      .then((response) => {


        console.log(response.data);
        var data = response.data['task_area'];

        console.log(data);

        this.task_area = response.data['task_area'];
        this.load_area();


      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
    this.Draw()

  },

  methods: {


    Draw() {
      var self = this
      const canvasEl = this.$refs.canvas;
      const ctx = canvasEl.getContext('2d');
      let offsetX = 0; // 拖动偏移X轴
      let offsetY = 0; // 拖动偏移Y轴
      let scale = 1; // 缩放比例
      let scaleStep = 0.5;
      let preScale = 1;
      let lastX = 0; // 上一次鼠标横坐标
      let lastY = 0; // 上一次鼠标纵坐标
      let curOffsetX = 0;// 记录上一次的偏移量
      let curOffsetY = 0;
      let x = 0; // 记录鼠标点击Canvas时的横坐标
      let y = 0;// 记录鼠标点击Canvas时的纵坐标
      let mousePositionx = 0;// 记录鼠标滚轮点击时的坐标位置
      let mousePositiony = 0;// 记录鼠标滚轮点击时的坐标位置


      function onMousedown(e) {
        if (e.button === 0) {
          // 鼠标左键
          x = e.clientX;
          y = e.clientY;
          window.addEventListener('mousemove', onMousemove);
          window.addEventListener('mouseup', onMouseup);
          self.$refs.child.onMousedown(e);

        }
      }

      function onMousemove(e) {
        offsetX = curOffsetX + (e.clientX - x);
        offsetY = curOffsetY + (e.clientY - y);
        self.offsetX = offsetX;
        self.offsetY = offsetY;
        paint();
      }

      function onMouseup() {
        curOffsetX = offsetX;
        curOffsetY = offsetY;
        window.removeEventListener('mousemove', onMousemove);
        window.removeEventListener('mouseup', onMouseup);
      }

      function onMousewheel(e) {
        e.preventDefault();

        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        const zoomFactor = delta > 0 ? 2 : 0.5; // 放大和缩小的比例因子

        const rect = canvasEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePositionx = e.offsetX;
        mousePositiony = e.offsetY


        scale = parseFloat((scale * zoomFactor).toFixed(2));// 解决小数点运算丢失精度的问题
        self.Scale = scale

        zoom();
      }

      function zoom() {
        offsetX = mousePositionx - (mousePositionx - offsetX) * scale / preScale
        offsetY = mousePositiony - (mousePositiony - offsetY) * scale / preScale

        self.offsetX = offsetX;
        self.offsetY = offsetY;

        paint();
        preScale = scale;
        curOffsetX = offsetX;
        curOffsetY = offsetY;

      }

      function draw() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        for (let i = 0; i < self.maplist.length; i++) {
          const object = self.maplist[i];
          if (object.geometry.type === "LineString") {
            const coordinates = object.geometry.coordinates;
            const bx = coordinates[0][0];
            const by = coordinates[0][1];
            const ex = coordinates[1][0];
            const ey = coordinates[1][1];
            ctx.lineWidth = 3;
            //颜色  
            ctx.strokeStyle = 'red'; //线条
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.closePath();
          } else if (object.geometry.type === "Point") {
            const coordinates = object.geometry.coordinates;
            const bx = coordinates[0];
            const by = coordinates[1];
            ctx.lineWidth = 3;
            //颜色  
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(bx, by, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
            ctx.stroke();
            ctx.closePath();
          }

        }
        for (let i = 0; i < self.task_area.length; i++) {
          let bx = self.task_area[0][0];
          let by = self.task_area[0][1];
          let ex = self.task_area[1][0];
          let ey = self.task_area[1][1];
          let w = ex - bx;
          let h = ey - by;
          ctx.lineWidth = 10;
          //颜色  
          ctx.strokeStyle = 'green'; //线条
          ctx.beginPath();
          ctx.rect(bx, by, w, h);
          ctx.stroke();
          ctx.closePath();

        }
        for (let i = 0; i < self.text_task_area.length; i++) {
          let bx = self.text_task_area[0][0];
          let by = self.text_task_area[0][1];
          let ex = self.text_task_area[1][0];
          let ey = self.text_task_area[1][1];
          let w = ex - bx;
          let h = ey - by;
          ctx.lineWidth = 10;
          //颜色  
          ctx.strokeStyle = 'green'; //线条
          ctx.beginPath();
          ctx.rect(bx, by, w, h);
          ctx.stroke();
          ctx.closePath();

        }


        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 50, 50);

        ctx.fillStyle = 'green';
        ctx.fillRect(150, 150, 50, 50);
      }

      function clear() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }

      function paint() {
        clear();
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        draw();
        ctx.restore();
      }

      canvasEl.addEventListener('mousedown', onMousedown);
      canvasEl.addEventListener('wheel', onMousewheel);
      draw();

    },
    line() {
      // 画线函数
      var self = this
      console.log('line事件');
      var canvas = document.getElementById("canvas");
      //获得2维绘图对象
      var ctx = canvas.getContext("2d");
      //设置线宽
      ctx.lineWidth = 3;
      //颜色  
      ctx.strokeStyle = 'red'; //线条
      var flag = false;
      var bx = 0;
      var by = 0;
      var ex = 0;
      var ey = 0;
      var i = 0;
      var count = 0;

      //按下
      canvas.onmousedown = function (e) {


        console.log('1111')
        if (count === 0) {
          if (flag === false) {
            bx = e.offsetX;
            by = e.offsetY;
            ctx.beginPath();
            ctx.arc(bx, by, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
            ctx.stroke();
            ctx.closePath();
            flag = true;
            i = 0;
            self.press_point1 = self.$refs.child.return_point()  //获取坐标经纬度
            console.log('point1', self.press_point1)
          } else {
            ex = e.offsetX;
            ey = e.offsetY;
            ctx.beginPath();
            ctx.arc(ex, ey, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
            ctx.stroke();
            ctx.closePath();
            flag = false;
            i = 1;

            self.press_point2 = self.$refs.child.return_point()  //获取坐标经纬度
            console.log('point2', self.press_point2)
          }
          if (i === 1) {
            console.log('经纬度', bx, by, ex, ey);
            console.log('scale', self.Scale);
            console.log('offsetX', self.offsetX);
            console.log('offsetY', self.offsetY);
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.closePath();
            count = 1;






            self.bx = (bx - self.offsetX) / self.Scale;
            self.by = (by - self.offsetY) / self.Scale;
            self.ex = (ex - self.offsetX) / self.Scale;
            self.ey = (ey - self.offsetY) / self.Scale;




          }

        }


      };
      // 抬起
      canvas.onmouseup = function (e) {
        console.log('up' + flag);
        if (!flag) {
          // 显示线条类型
          self.isshowline = true;
          self.itemlist = ['高速', '国道', '土路']


        }
      };


    },
    point() {
      // 画点函数
      var self = this
      console.log('point事件');
      var canvas = document.getElementById("canvas");
      //获得2维绘图对象
      var ctx = canvas.getContext("2d");
      //设置线宽
      ctx.lineWidth = 3;
      //颜色  
      ctx.strokeStyle = 'blue'; //线条
      var flag = false;
      var bx = 0;
      var by = 0;

      //按下
      canvas.onmousedown = function (e) {

        bx = e.offsetX;
        by = e.offsetY;
        ctx.beginPath();
        ctx.arc(bx, by, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
        ctx.stroke();
        ctx.closePath();

        self.bx = (bx - self.offsetX) / self.Scale;
        self.by = (by - self.offsetY) / self.Scale;
        self.press_point1 = self.$refs.child.return_point()  //获取坐标经纬度
        console.log('point1', self.press_point1)



      };
      canvas.onmouseup = function (e) {
        console.log('up' + flag);
        if (!flag) {
          // 显示线条类型
          self.isshowpoint = true;
          self.itemlist = ['房屋', '超市', '医院']


        }
      };


    },
    save() {
      axios.post('http://10.112.244.193:8000/dimension/submit', {
        task_id: this.task_id,
        vectorgraph: this.submit_list,
        type: 0,
        user_id: 1,

      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submit() {
      axios.post('http://10.112.244.193:8000/dimension/submit', {
        task_id: this.task_id,
        vectorgraph: this.submit_list,
        user_id: 1,
        type: 1,

      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    chooseline(a) {
      this.chooseitem = a
      function push1(a, bx, by, ex, ey, choose) {
        var object = { 'type': "Feature", "geometry": { "type": "LineString", "coordinates": [[bx, by], [ex, ey]] }, "properties": { "type": choose } }
        a.push(object)



      }

      function push2(a, bx, by, ex, ey, choose) {
        var object = { "type": "LineString", "coordinate": [[bx, by], [ex, ey]], "properties": { "type": choose }, 'operate': 'add' }

        a.push(object)
      }

      push1(this.maplist, this.bx, this.by, this.ex, this.ey, this.chooseitem)
      push2(this.submit_list, this.press_point1[0], this.press_point1[1], this.press_point2[0], this.press_point2[1], this.chooseitem)

      this.isshowline = false



      console.log('this.submit_list', this.submit_list)
    },
    choosepoint(a) {
      this.chooseitem = a

      this.isshowpoint = false
      function push1(a, bx, by, choose) {

        var object = { 'type': "Feature", "geometry": { "type": "Point", "coordinates": [bx, by] }, "properties": { "type": choose } }
        a.push(object)


      }

      function push2(a, bx, by, choose) {
        var object = { "type": "Point", "coordinate": [bx, by], "properties": { "type": choose }, 'operate': 'add' }
      }
      push1(this.maplist, this.bx, this.by, this.chooseitem)
      push2(this.submit_list, this.press_point1[0], this.press_point1[1], this.chooseitem)

      console.log(this.submit_list)
    },
    // load_area() {
    //   let a = [98.520630, 25.006419]
    //   let b = [98.528630, 25.014419]
    //   let ax = this.$refs.child.draw(a);
    //   let bx = this.$refs.child.draw(b);
    //   this.text_task_area.push(ax);
    //   this.text_task_area.push(bx);
    // },
    load_area() {
      let a = this.$refs.child.draw(this.task_area[0]);
      let b = this.$refs.child.draw(this.task_area[1]);
      this.task_area[0] = a;
      this.task_area[1] = b;
    },

    handelcenter(center) {
      this.center = center
      console.log(this.center)
    }



  },
  setup() {
    const input1 = ref('')
    const input2 = ref('')
    const input3 = ref('')
    const input4 = ref('')
    return {
      input1,
      input2
    }
  },
  components: {
    Map
  },

  watch: {
    posValue(newValue, oldValue) {
      console.log('更新了' + posValue)
    },
  }


}
</script>

<style>
.height {
  height: 92vh;

  background-color: aqua;

}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.chart-wrap {
  height: calc(100% - 40px);
  min-height: 500px;
  min-width: 500px;
  margin: 20px;
  box-shadow: 0 0 3px orange;
}

.max-z-index {
  z-index: 3;
}

.min-z-index {
  z-index: 2;
}
</style>