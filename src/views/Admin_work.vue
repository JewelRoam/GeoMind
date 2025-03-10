<template>
  <!-- 管理员发布任务 -->
  <div class="common-layout">
    <el-container class="height">
      <el-aside width="300px" id="aside1">
        <el-form :model="form" label-width="120px">

          <el-form-item label="任务名称">
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item label="截止时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
            </el-col>
          </el-form-item>

          <el-form-item label="选择网络">
            <el-radio-group v-model="form.resource">
              <el-radio :label="0">开放网络</el-radio>
              <el-radio :label="1">封闭网络</el-radio>
            </el-radio-group>

          </el-form-item>
          <el-form-item label="选择组织">
            <!-- <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select> -->
            <!-- <div class="input-row"> -->
            <label for="province">省份:</label>
            <select id="province" v-model="selectedProvince" @change="updateCities">
              <option v-for="province in provinces" :value="province">{{ province }}</option>
            </select>

            <label for="city">城市:</label>
            <select id="city" v-model="selectedCity" @change="updateDistricts">
              <option v-for="city in cities" :value="city">{{ city }}</option>
            </select>

            <label for="district">区域:</label>
            <select id="district" v-model="form.address">
              <option v-for="district in districts" :value="district">{{ district }}</option>
            </select>
            <!-- </div> -->
          </el-form-item>
          <el-form-item label="任务详细描述">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>

        </el-form>
      </el-aside>
      <el-container>

        <el-header style="background-color: black;height: 40px;z-index: 2;position: fixed;left: 36vh;">
          <button @click="Line" style="width: 36px; height: 30px; margin-top: 5px;"><svg viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 20px;height: 20px; margin:  auto 0;">
              <path
                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
                fill="currentColor"></path>
            </svg></button>



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



          <!-- <img id="mapImage" alt="Map Image" style="z-index: 1;position: absolute; width: 1024px; height: 1024px;"> -->
          <canvas ref="canvas" id="canvas" height="1024" width="1024"
            style="z-index: 2; position: absolute; box-shadow: 1px;">
          </canvas>
          <Map style="position: absolute;z-index: 1;" ref="child" @dataFromChild="handleDataFromChild"></Map>






        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import { draw } from "../assets/js/draw.js";
import { ref } from 'vue'
import { reactive } from 'vue'
import Map from '../views/Map.vue'
import moment from 'moment';
export default {
  data() {
    return {
      provinces: [
        "北京市",     // 11
        "天津市",     // 12
        "河北省",     // 13
        "山西省",     // 14
        "内蒙古自治区", // 15
        "辽宁省",     // 21
        "吉林省",     // 22
        "黑龙江省",    // 23
        "上海市",     // 31
        "江苏省",     // 32
        "浙江省",     // 33
        "安徽省",     // 34
        "福建省",     // 35
        "江西省",     // 36
        "山东省",     // 37
        "河南省",     // 41
        "湖北省",     // 42
        "湖南省",     // 43
        "广东省",     // 44
        "广西壮族自治区", // 45
        "海南省",     // 46
        "重庆市",     // 50
        "四川省",     // 51
        "贵州省",     // 52
        "云南省",     // 53
        "西藏自治区",   // 54
        "陕西省",     // 61
        "甘肃省",     // 62
        "青海省",     // 63
        "宁夏回族自治区", // 64
        "新疆维吾尔自治区", // 65
        "香港特别行政区",   // 81
        "澳门特别行政区"    // 82
      ],
      cities: [],  // 初始为空，基于选中的省份进行填充
      districts: [],  // 初始为空，基于选中的城市进行填充
      selectedProvince: null,
      selectedCity: null,
      formattedDateTime: [],
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
      markList: [],
      taskArea: null,
      postlist: [],
      transfactor: null,
    }
  },

  mounted() {
    this.Draw()
  },
  components: {
    Map
  },



  methods: {
    createAdminTask(level, list) {
      axios.get('http://localhost:8080/admincenter/task/create', {
        params: {
          level: level,
          list: list,
        }
      })
        .then(response => {
          // 请求成功，存储返回的数据
          if (response.data && response.data.status === 200) {
            this.taskArea = response.data.task_area;
            this.status = response.data.status;
          } else {
            // 处理错误情况
            console.error('Request failed with status:', response.data.status);
          }
        })
        .catch(error => {
          // 处理请求错误
          console.error('Error making request:', error);
        });
    },
    initCanvas() {
      let that = this
      this.$nextTick(() => {
        // 初始化canvas宽高
        let cav = this.$refs.markCanvas;
        cav.width = 800;
        cav.height = 600;
        let ctx = cav.getContext('2d');
        ctx.strokeStyle = 'blue'
        cav.style.cursor = 'crosshair'

        // 计算使用变量
        let list = this.markList; // 画框数据集合, 用于服务端返回的数据显示和绘制的矩形保存
        // 若服务端保存的为百分比则此处需计算实际座标, 直接使用实际座标可省略
        list.forEach(function (value, index, array) {
          let newValue = {
            x: value.x * cav.width,
            y: value.y * cav.height,
            w: value.w * cav.width,
            h: value.h * cav.height,
          }
          list.splice(index, 1, newValue);
        })

        // 若list长度不为0, 则显示已标记框
        if (list.length !== 0) {
          list.forEach(function (value, index, array) {
            // 遍历绘制所有标记框
            ctx.rect(value.x, value.y, value.w, value.h);
            ctx.stroke();
          });
        }

        // 调用封装的绘制方法
        draw(cav, list,);
        console.log(that.bx, that.by, that.ex, that.ey);
        // 备注: js中对象操作指向的是对象的物理地址, 获取绘制完矩形的结果数组直接取用或处理this.markList即可
      })
    },//废弃的
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
    Line() {
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
      var lineCountFlag = 0;
      var bx = 0;
      var by = 0;
      var ex = 0;
      var ey = 0;
      var i = 0;
      //按下
      canvas.onmousedown = function (e){
        if(lineCountFlag === 0) {
          console.log('1111')
          if (flag === false) {
            bx = e.offsetX;
            by = e.offsetY;
            ctx.beginPath();
            ctx.arc(bx, by, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
            ctx.stroke();
            ctx.closePath();
            flag = true;
            i = 0;
          } else {
            ex = e.offsetX;
            ey = e.offsetY;
            ctx.beginPath();
            ctx.arc(ex, ey, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
            ctx.stroke();
            ctx.closePath();
            flag = false;
            i = 1;
          }
          if (i === 1) {
            console.log('经纬度', bx, by, ex, ey);
            ctx.beginPath();
            let w = ex - bx;
            let h = ey - by;
            ctx.rect(bx, by, w, h);
            ctx.stroke();
            ctx.closePath();
            // var object = { "type": "line", "coordinates": [{ "x": bx, 'y': by }, { 'x': ex, 'y': ey }] }
            // lsit.push(object)
  
            // console.log(lsit)
  
  
  
            self.bx = (bx - self.offsetX) / self.Scale
            self.by = (by - self.offsetY) / self.Scale
            self.ex = (ex - self.offsetX) / self.Scale
            self.ey = (ey - self.offsetY) / self.Scale
            lineCountFlag = 1;
          }
        }
      };
      // 抬起
      canvas.onmouseup = function (e) {
        // if(lineCountFlag == 0) {
          console.log('up' + flag);
          if (!flag) {
            console.log("2222");
            function push2(a, bx, by, ex, ey) {
  
              var object = { 'type': "Feature", "geometry": { "type": "Rect", "coordinates": [[bx, by], [ex, ey]] } }
              a.push(object)
  
  
            }
            push2(self.maplist, bx, by, ex, ey)
  
            console.log(self.maplist)
  
            let mx = (bx + ex) /2;
            let my = (by + ey) /2;
            let halfH = (by-ey)/2;
            let halfW = (bx-ex)/2;
  
            console.log("中心点坐标：", mx,",", my);
  
            // 假的，待完善
            let blo=lo-0.04;
            let bla=la-0.04;
            let elo=lo+0.04;
            let ela=la+0.04;
            // console.log(self.$refs.child.selectMapData.lngLatToMercator);
            // console.log(self.$refs.child.lngLatToMercator);
            // let blo=bx /(self.$refs.child.selectMapData.lngLatToMercator || self.$refs.child.lngLatToMercator);
            // let bla=by /(self.$refs.child.selectMapData.lngLatToMercator || self.$refs.child.lngLatToMercator);
            // let elo=ex /(self.$refs.child.selectMapData.lngLatToMercator || self.$refs.child.lngLatToMercator);
            // let ela=ey /(self.$refs.child.selectMapData.lngLatToMercator || self.$refs.child.lngLatToMercator);
            // if (this.transfactor) {
            //   let blo=bx/transfactor;
            //   let bla=by/transfactor;
            //   let elo=ex/transfactor;
            //   let ela=ey/transfactor;
            //   self.postlist.push({ blo, bla }, { elo, ela });
            //   console.log(self.postlist);
            // }
            self.postlist.push(
                [blo, bla],
                [elo, ela]
            );
            console.log("postlist", self.postlist);
            
          }       
        // }
      };

      // console.log('Data from child:', this.$refs.child.posValue);
      // alert(this.$refs.child.posValue);
      function parsePosValue(posValue) {
        console.log("parsePosValue", posValue);//测试用
        // 分割字符串，假设 posValue 的格式是 "经度,纬度"
        const parts = posValue.split(',');

        // 检查分割后的数组长度是否为 2
        if (parts.length === 2) {
          // 将字符串转换为数字
          const lo = parseFloat(parts[0]); // 经度
          const la = parseFloat(parts[1]); // 纬度

          // 返回包含经度和纬度的对象
          return { lo, la };
        } else {
          // 如果格式不正确，返回 null 或抛出错误
          console.error('Invalid posValue format');
          return null;
        }
      }

      // const posValue = "120.12345,30.67890";
      const { lo, la } = parsePosValue(self.$refs.child.posValue); //中心点经纬度

      console.log("中心点经度：", lo); // 输出经度
      console.log("中心点纬度：", la); // 输出纬度
    },
    handleDataFromChild(data) {
      // 在这里处理接收到的数据
      console.log('Received data from Map component:', data);
      this.transfactor = data;
    },

    async updateCities() {
      try {
        const response = await axios.get('http://10.112.244.193:8001/search_sub', {
          params: {
            name: this.selectedProvince,
            type: 1  // 1 表示省份
          }
        });

        if (response.status === 200) {
          this.cities = response.data.list;
          this.selectedCity = ''; // 重置选中的城市
          this.districts = [];   // 清空区域列表
          this.form.address = ''; // 重置选中的区域
        } else {
          // 处理请求失败的情况
          console.error('获取城市列表失败');
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    },

    async updateDistricts() {
      try {
        const response = await axios.get('http://10.112.244.193:8001/search_sub', {
          params: {
            name: this.selectedCity,
            type: 2  // 2 表示城市
          }
        });

        if (response.status === 200) {
          this.districts = response.data.list;
          this.form.address = ''; // 重置选中的区域
        } else {
          // 处理请求失败的情况
          console.error('获取区域列表失败');
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    },  

    submit() {
      // 检查必填字段
      if (!this.form.name) {
        alert("请填写任务名称");
        return;
      }
      if (!this.form.desc) {
        alert("请填写任务详细描述");
        return;
      }
      // if (!this.form.resource) {
      //   alert("请选择网络");
      //   return;
      // }
      if (!this.form.date1 || !this.form.date2) {
        alert("请选择完整的截止时间");
        return;
      }
      //if (!this.selectedProvince || !this.selectedCity || !this.form.address) {
          //alert("请选择完整的地区信息");
          //return;
      //}

      let dateStr = this.form.date1+this.form.date2;
      console.log(dateStr);
      // Parse the date string using Moment.js
      let parsedDate = moment(dateStr, "ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)");
      // Check if the parsed date is valid
      if (parsedDate.isValid()) {
        // 将日期截断到秒
        parsedDate.startOf('second');
        // Format the date as ISO 8601
        this.formattedDateTime = parsedDate.toISOString();
        // Output the result
        console.log(this.formattedDateTime);
      } else {
        console.error("Invalid date string");
      }

      axios.post('http://10.112.244.193:8001/admincenter/task/publish', {
        admin_id: "4",
        task_name: this.form.name,
        task_content: this.form.desc,
        network: this.form.resource,
        organization_id: this.form.region,
        // task_state: "1",
        area: this.selectedProvince+this.selectedCity+this.form.address,
        // area: "北京市",
        end_time: this.formattedDateTime,
        level: "0",
        // type: 1,
        coordinates: this.postlist
      })
        .then(function (response) {
          console.log(response);
          alert("提交成功");
        })
        .catch(function (error) {
          console.log(error);
        });
    },



  },
  setup() {
    const input1 = ref('')
    const input2 = ref('')
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    const onSubmit = () => {
      console.log('submit!')
    }

    return {
      input1,
      input2,
      form
    }
  },
}
</script>
  
<style>
.height {
  height: auto;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0px;
  position: absolute;
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

.input-row {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
}

#aside1 {
  width: 36vh;
  top: 0;
  bottom: 0%;
  padding: 1vh;
  z-index: 2;
  background-color: white;
  position: inherit;
}

#canvas {
  position: fixed;
  left: 36vh;
  right: 0%;
  top: 5%;
  bottom: 0%;
}
</style>