<template>
    <UserHead></UserHead>
    <!-- 审核员任务界面 -->
    <div class="common-layout" style="margin-top: 60px;">
        <el-container class="height">
            <el-aside width="300px" style="background-color:white;">
                <div class="demo-input-suffix">
                    <div>

                        <el-select v-show="isshow" v-model="value" class="m-2" placeholder="错误类型"
                            style="width: 100% ;margin-top: 20px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-input v-show="isshow" v-model="input" placeholder="文字描述" style="margin-top: 10px;" />
                        <el-button v-show="isshow" type="primary" @click="push_in">确定</el-button>

                    </div>
                </div>
            </el-aside>
            <el-container>

                <el-header style="background-color:black; height: 40px;">
                    <button @click="worng" style="width: 36px; height: 30px; margin-top: 5px;margin-left: 10px; ">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                            <path fill="currentColor" d="M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64z"></path>
                        </svg>
                    </button>


                    <button @click="save" id="save"
                        style="width: 36px; height: 30px; margin-top: 5px;float: right; color:blue">

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

                    <img id="mapImage" alt="Map Image"
                        style="z-index: 1;position: absolute; width: 1024px; height: 1024px;">
                    <canvas ref="canvas" id="canvas" height="1024" width="1024"
                        style="z-index: 2; position: absolute; box-shadow: 1px;">
                    </canvas>

                    <!-- 画板 -->
                    <Map ref="child" @hanldeParent="handel"
                        style="z-index: 1;position: absolute; width: 1024px; height: 1024px;"></Map>








                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import axios from 'axios'
import Map from '../views/Map.vue'
import { defineCustomElement, ref } from 'vue'
import UserHead from '../views/UserHead.vue'

export default {
    data() {
        return {
            maplist: [],
            input: '',
            bx: 0,
            by: 0,
            ex: 0,
            ey: 0,
            coordinates: [],
            isshow: false,
            errorlist: [],
            drawlist: [],
            offsetX: 0,
            offsetY: 0,
            Scale: 1,
            x_press: 0,
            y_press: 0,
            prevScale: 1,
            center: [0, 0],
            submit_list: [],
            press_point: [],
            // 模型提取的geojson
            text_json: {
                "type": "FeatureCollection",
                "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                "features": [
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525068771111293, 25.010414304747112], [98.525070523187424, 25.010403792290269], [98.525095052253391, 25.010344221701491], [98.525112573014795, 25.010284651112713], [98.525119581319359, 25.010277642808148]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525520806755551, 25.010358238310616], [98.525503285994148, 25.010356486234475], [98.525436707100809, 25.01034246962535], [98.52542619464397, 25.01034246962535], [98.525403417654132, 25.010335461320789], [98.525377136512034, 25.010330205092366], [98.525329830456229, 25.010323196787805], [98.525303549314117, 25.010316188483241], [98.525272011943599, 25.010310932254821], [98.525249234953762, 25.010303923950257], [98.525182656060423, 25.010293411493414], [98.525158126994455, 25.01028640318885], [98.525144110385327, 25.01028640318885], [98.525119581319359, 25.010277642808148]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525119581319359, 25.010277642808148], [98.525117829243229, 25.010268882427447], [98.525138854156907, 25.010205807686386], [98.525165135299019, 25.010135724640762], [98.525168639451294, 25.010121708031637], [98.525182656060423, 25.010084914432685], [98.525189664364987, 25.010058633290576], [98.525201928897971, 25.01003060007233], [98.525203680974116, 25.010014831387064]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525520806755551, 25.010049872909875], [98.525499781841873, 25.010044616681451], [98.525434955024664, 25.010032352148468], [98.525424442567825, 25.010028847996189], [98.525356111598342, 25.010023591767766], [98.525354359522197, 25.010021839691625], [98.525259747410615, 25.010021839691625], [98.525222953811664, 25.010013079310923], [98.525205433050246, 25.010013079310923]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525203680974116, 25.010014831387064], [98.525203680974116, 25.010013079310923]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525203680974116, 25.010014831387064], [98.525205433050246, 25.010013079310923]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525203680974116, 25.010013079310923], [98.525205433050246, 25.010013079310923]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525203680974116, 25.010013079310923], [98.525191416441132, 25.010006071006362], [98.525147614537616, 25.009997310625657], [98.525126589623923, 25.009990302321096], [98.525088043948827, 25.009983294016532], [98.525067019035149, 25.009976285711971], [98.525035481664617, 25.009960517026705], [98.52499693598952, 25.009937740036879], [98.524963646542858, 25.009925475503895], [98.524925100867762, 25.009921971351613], [98.524912836334778, 25.009918467199331], [98.524876042735826, 25.009914963047052], [98.524797199309504, 25.009904450590209], [98.524783182700375, 25.009900946437927], [98.524725364187731, 25.009895690209504], [98.524660537370536, 25.009886929828802], [98.524632504152279, 25.009881673600379]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.525214193430955, 25.009983294016532], [98.525222953811664, 25.009960517026705], [98.525238722496923, 25.009928979656177], [98.525243978725342, 25.00991145889477], [98.525257995334471, 25.009888681904943]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.524648272837553, 25.009909706818629], [98.524650024913697, 25.009904450590209]] } },
                    { "type": "Feature", "properties": { "FID": 0 }, "geometry": { "type": "LineString", "coordinates": [[98.52526325156289, 25.0098781694481], [98.525277268172019, 25.009837871696867], [98.525286028552713, 25.009823855087742], [98.525289532705003, 25.009806334326335], [98.525301797237987, 25.009778301108085], [98.52531406177097, 25.009755524118258], [98.52531931799939, 25.009738003356855], [98.525338590836938, 25.009701209757903], [98.525343847065358, 25.009674928615794], [98.525357863674486, 25.009653903702105], [98.525405169730277, 25.009664416158948], [98.525431450872389, 25.009673176539653], [98.525452475786068, 25.009676680691932], [98.525492773537309, 25.009687193148778], [98.525520806755551, 25.009692449377198]] } }
                ]
            },

            //模型提取的geojson
            text_list: [],
            task_id: 0,



        }
    },

    mounted() {
        this.task_id = this.$route.params.taskId;
        // this.task_id = 17;
        console.log("task_id:", this.task_id);
        axios
            .get('http://10.112.244.193:8000/get/map/', {
                // 传递的参数
                params: {
                    task_id: 7,
                    level: 0,
                    longitude: 45.231512,
                    latitude: 84.25150
                },
                responseType: "blob" // 告诉 Axios 响应类型是二进制数据
            }
            ) // 后端图像获取的 URL
            .then((response) => {

                // 创建一个 URL 对象以显示图像
                const imageUrl = URL.createObjectURL(response.data);

                // 使用 imageUrl 来设置图像元素的 src
                const imgElement = document.getElementById("mapImage");
                imgElement.src = imageUrl;
            })
            .catch((error) => {
                console.error("Error loading image:", error);
            });
        axios
            .get('http://10.112.244.193:8000/get/marking/info', {
                // 传递的参数
                params: {

                    task_id: 17,
                },
                headers:{
                    'Content-Type':'application/json'
                }

            }
            ) //获取矢量数据
            .then((response) => {

                this.maplist = JSON.parse(JSON.stringify(response.data))//存储到缓存
                console.log('response.data', JSON.parse(JSON.stringify(response.data)))
                this.load_vectorgraph()
                this.change()
                this.Draw()


            })
            .catch((error) => {
                console.error("Error loading image:", error);
            });






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
                for (let i = 0; i < self.drawlist.length; i++) {
                    const object = self.drawlist[i];


                    if (object.geometry.type === "LineString") {

                        const coordinates = object.geometry.coordinates;

                        var bx = coordinates[0][0];
                        var by = coordinates[0][1];

                        const ex = coordinates[1][0];
                        const ey = coordinates[1][1];
                        console.log('bx,by,ex,ey',bx,by,ex,ey)

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
                for (let i = 0; i < self.errorlist.length; i++) {
                    var content = self.errorlist[i].geometry.coordinates

                    var bx = content[0][0];
                    var by = content[0][1];
                    for (let j = 1; j < content.length; j++) {
                        var ex = content[j][0];
                        var ey = content[j][1];
                        ctx.lineWidth = 3;
                        //颜色  
                        ctx.strokeStyle = 'red'; //线条
                        ctx.beginPath();
                        ctx.moveTo(bx, by);
                        ctx.lineTo(ex, ey);
                        ctx.stroke();
                        ctx.closePath();
                        bx = ex;
                        by = ey;

                    }
                }
                for (let i = 0; i < self.text_list.length; i++) {
                    const object = self.text_list[i];


                    if (object.geometry.type === "LineString") {

                        const coordinates = object.geometry.coordinates;

                        var bx = coordinates[0][0];
                        var by = coordinates[0][1];

                        for (let j = 1; j < coordinates.length; j++) {
                            const ex = coordinates[j][0];
                            const ey = coordinates[j][1];

                            ctx.lineWidth = 3;
                            //颜色  
                            ctx.strokeStyle = 'red'; //线条
                            ctx.beginPath();
                            ctx.moveTo(bx, by);
                            ctx.lineTo(ex, ey);
                            ctx.stroke();
                            ctx.closePath();
                            bx = ex;
                            by = ey

                        }




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
        worng() {
            // 错误标注，随意标注的线
            // 画线函数
            var self = this
            console.log('标错事件');
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
            var sx = 0;
            var sy = 0;
            var i = 0;
            var templist = [];
            var x = 0;
            var y = 0;
            var count = 0;


            //按下
            canvas.onmousedown = function (e) {

                if (count === 0) {
                    if (flag == false) {

                        bx = e.offsetX;
                        by = e.offsetY;
                        sx = e.offsetX;
                        sy = e.offsetY;
                        ctx.beginPath();
                        ctx.arc(bx, by, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
                        ctx.stroke();
                        ctx.closePath();
                        flag = true;
                        x = (sx - self.offsetX) / self.Scale;
                        y = (sy - self.offsetX) / self.Scale
                        templist = [x, y]
                        let templit_press_point = self.$refs.child.return_point()//获取坐标经纬度
                        self.press_point = self.press_point.concat([templit_press_point])
                        self.coordinates = self.coordinates.concat([templist])
                        console.log(self.coordinates)



                    } else if (e.offsetX - 5 < sx &&
                        e.offsetX + 5 > sx &&
                        e.offsetY - 5 < sy &&
                        e.offsetY + 5 > sy && flag === true) {
                        // 如果在起点20范围内，直接连接起点
                        ctx.beginPath();
                        ctx.moveTo(bx, by);
                        ctx.lineTo(sx, sy);
                        ctx.stroke();
                        ctx.closePath();
                        flag = false;
                        x = (sx - self.offsetX) / self.Scale;
                        y = (sy - self.offsetX) / self.Scale
                        templist = [x, y]
                        let templit_press_point = self.$refs.child.return_point()//获取坐标经纬度
                        self.press_point = self.press_point.concat([templit_press_point])
                        self.coordinates = self.coordinates.concat([templist])
                        console.log(self.coordinates)
                        count = 1;


                    } else if (flag === true) {

                        ex = e.offsetX;
                        ey = e.offsetY;
                        ctx.beginPath();
                        ctx.arc(ex, ey, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
                        ctx.stroke();
                        ctx.closePath();

                        console.log('经纬度', bx, by, ex, ey);
                        ctx.beginPath();
                        ctx.moveTo(bx, by);
                        ctx.lineTo(ex, ey);
                        ctx.stroke();
                        ctx.closePath();
                        bx = ex;
                        by = ey;
                        x = (ex - self.offsetX) / self.Scale;
                        y = (ey - self.offsetX) / self.Scale;
                        templist = [x, y]
                        let templit_press_point = self.$refs.child.return_point()//获取坐标经纬度
                        self.press_point = self.press_point.concat([templit_press_point])
                        self.coordinates = self.coordinates.concat([templist])
                        console.log(self.coordinates)


                    }
                }




            };
            // 抬起
            canvas.onmouseup = function (e) {

                if (!flag) {
                    // 显示错误类型
                    self.isshow = true;



                }
            };

        },

        save() {
            axios.post('http://10.112.244.193:8000/checker/submit', {
                task_id: this.task_id,
                checker_id: 1,
                type: 0,
                vectorgraph: this.submit_list,


            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        submit() {
            axios.post('http://10.112.244.193:8000/checker/submit', {
                task_id: this.task_id,
                checker_id: 1,
                type: 1,
                vectorgraph: this.submit_list,

            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        load_vectorgraph() {

            this.drawlist = this.maplist['marking_file']['features']
            console.log("this.drawlist",this.drawlist)
            var datalist = this.maplist['marking_file']['features']
            var data = {}
            for (let key in datalist) {
                data = datalist[key]


                if (data.geometry.type === "Point") {
                    point(myFunction(data.geometry.coordinates[0]), myFunction(data.geometry.coordinates[1]))
                }
            }
            // 画点函数
            function point(x, y) {

                console.log('point');
                var canvas = document.getElementById("canvas");
                //获得2维绘图对象
                var ctx = canvas.getContext("2d");
                //设置线宽
                ctx.lineWidth = 3;
                //颜色  
                ctx.strokeStyle = 'blue'; //线条

                ctx.beginPath();
                ctx.arc(x, y, 1, 0, [(Math.PI) / 180] * 360);// 不写anticlockwise项的话默认为顺时针
                ctx.stroke();
                ctx.closePath();


            }
            // 取整函数
            function myFunction(num) {
                return Math.round(num);
            }


        },
        change() {
            // 将用户标注的矢量信息转为画布坐标

            for (let i = 0; i < this.drawlist.length; i++) {
                const object = this.drawlist[i];




                const coordinates = object.geometry.coordinates;


                for (let j = 0; j < coordinates.length; j++) {
                    const ex = coordinates[j];

                    let ax = this.$refs.child.draw(ex);
                    coordinates[j] = ax;

                }


            }

            // 将模型提取的矢量信息转为画布坐标
            this.text_list = this.text_json['features']
            for (let i = 0; i < this.text_list.length; i++) {
                const object = this.text_list[i];




                const coordinates2 = object.geometry.coordinates;


                for (let j = 0; j < coordinates2.length; j++) {
                    const ex = coordinates2[j];

                    let ax = this.$refs.child.draw(ex);
                    coordinates2[j] = ax;
                    console.log(coordinates2[j]);
                }


            }
        },
        push_in() {
            var list1 = {
                "type": "Feature",
                "geometry": {
                    // "type": "Polygon",
                    "coordinates": this.coordinates
                },
                "properties": {
                    errortype: this.value,
                    errordetials: this.input,
                }
            }
            var list2 = {
                "type": "Polygon",
                "coordinates": this.press_point,
                "properties": {
                    errortype: this.value,
                    errordetials: this.input,
                },
                'operate': 'add',

            }
            this.errorlist.push(list1)
            this.submit_list.push(list2)
            console.log('this.errorlist', this.errorlist)
            this.isshow = false

        },


    },
    setup() {
        const input1 = ref('')
        const input2 = ref('')
        const value = ref('')

        const options = [
            {
                value: '错误1',
                label: '错误1',
            },
            {
                value: '错误2',
                label: '错误2',
            },
            {
                value: '错误3',
                label: '错误3',
            },
            {
                value: '错误4',
                label: '错误4',
            },

        ]
        return {
            input1,
            input2,
            value,
            options
        }
    },
    components: {
        Map,
        UserHead
    }
}
</script>

<style>
.height {
    height: 92vh;

    background-color: aqua;

}
</style>