<template>
  <div>
    <img class="BackgroundImage" />
    <el-container>
      <el-aside class="Sidebar">
        <div class="box1">
        <div class="Block TrashbinList">
          <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/trashbin-logo.png" alt="Trash bin logo" />
            <div class="Link">回收站</div>
          </div>
        </div>
        <div class="Block RecentList">
          <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/recent-logo.png" alt="Recent logo">
            <div class="Link">最近</div>
          </div>
          <!-- <ul class="LinkSecond">
            <li>最近上传</li>
            <li>最近打开</li>
            <li>最近删除</li>
          </ul> -->
        </div>
        <div class="Block MytaskList">
          <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/mytask-logo.png" alt="My task logo" />
            <div class="Link">我的任务</div>
          </div>
          <div class="app">
            <ul class="LinkSecond">
              <li v-for="task in tasks" :key="task.task_id">{{ task.task_name }}</li>
            </ul>
          </div>
        </div>
        </div>
      </el-aside>
      
      <div class="content">
        <div class="Searchbox">
          <div>
            <!-- 搜索框，使用v-model绑定到searchInput变量 -->
            <input type="text" v-model="searchInput" placeholder="搜索任务">
  
            <!-- 显示符合搜索条件的任务 -->
            <div v-for="(task, index) in filteredTasks" :key="index">
              {{ task.name }} <!-- 这里假设任务对象有一个'name'属性，你可以根据实际情况修改 -->
            </div>
          </div>
        </div>

        <el-scrollbar class="scrollbar" wrap-class="scroll-wrapper">
          <div class="scrollbar-flex-content">
            <!-- <el-slider v-model="size" /> -->
    
            <el-space v-if="!isloading" wrap :size="size" :rows="3" class="slide-space">
              <el-card v-for="task in tasks" :key="task.task_id" class="box-card" :style="cycleThumb(task.task_id)">
                <template #header>
                  <div class="card-header">
                    <span style="font-weight: bold; color: #D9D9D9">{{ task.task_name }}</span>
                    <router-link :to="'/admin/task/info/' + task.task_id"><el-button class="button" text>查看任务</el-button></router-link>
                  </div>
                </template>
                <div class="textItem">
                  <li>任务ID：{{ task.task_id }}</li>
                  <li>开始时间：{{ task.start_time }}</li>
                  <li>结束时间：{{ task.end_time }}</li>
                </div>
              </el-card>    
            </el-space>
          </div>
        </el-scrollbar>
  
        <el-footer class="BottomBar">
          <div>
            <!-- Vue组件内容将被渲染到这里 -->
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="BottomBar">
              <div class="TextBox2" v-if="tasks.length > 0">任务总共：{{ taskCount }}</div>
              <!-- 其他底部栏内容 -->
            </div>
            <!-- 其他Vue组件内容 -->
          </div>
        </el-footer>
      </div>
    </el-container>  
</div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      tasks: [], // 存储任务数据的数组
      taskCount: 0, // 存储任务数量的变量
      errorMessage: '', // 存储错误消息的变量
      searchInput: '', // 存储搜索框的输入值
      size: 20,
      URLs: {},
      isloading: true
    };
  },
  methods: {
    getTasks() {
      axios.get('http://10.112.244.193:8001/admincenter/tasks', {
        params: {
          admin_id: 4
          // admin_id: sessionStorage.getItem('admin_info.id')
        }
      })
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data && data.tasks) {
            this.tasks = data.tasks;
            this.taskCount = this.tasks.length;
            this.getThumb();
          } else {
            console.error('未获取到有效的任务数据。');
            this.errorMessage = '未获取到有效的任务数据。';
          }
        } else {
          throw new Error('请求失败');
        }
      })
      .catch(error => {
        console.error('获取任务失败:', error);
        // 将错误消息存储在errorMessage变量中
        this.errorMessage = '获取任务失败，请稍后重试。';
      });
    },
    getThumb() {
      var GLOBAL = GLOBAL || {};
      let taskId = '';
      
      function processTask(task) {
        taskId = task.task_id.toString();
        GLOBAL[taskId] = "url('http://10.112.244.193:8001/task/thumbnail?task_id=" + taskId + "')";
      }

      this.tasks.forEach(processTask);
      this.URLs = GLOBAL;
      this.isloading = false
    },
    cycleThumb(item) {
      return 'width: 220px; height: 220px; background-size: cover; background-image:' + this.URLs[item]
    }
  },
  computed: {
    // 使用计算属性过滤符合搜索条件的任务
    filteredTasks() {
      const searchQuery = this.searchInput.toLowerCase(); // 将搜索框的输入值转换为小写
      // 使用filter方法过滤符合搜索条件的任务
      return this.tasks.filter(task => task && task.name?.toLowerCase().includes(searchQuery));
    },
  },
  mounted() {
    this.getTasks(); 
  },
};
</script>


<style scoped>
.BackgroundImage { top: 0;
  left: 0%;
  width: 100%; 
  height: 100%; 
  /* padding-bottom: calc(1034 / 1707 * 100%);  */
  background-image: url('@/assets/images/标注员/background-image.png');
  background-size: cover; 
  background-position: center; 
  position: fixed;
  opacity: 0.50; }
.Sidebar { position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 17.5%;
    background: black;
    opacity: 0.60;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px; }
.LogoLinkGroup { display: flex;
    align-items: center;
    gap: 10px; }
.Logo { width: 12px;
    height: 12px;
    flex-shrink: 0;
    fill: #BEBEBE; }
.Link { color: #FFF;
    font-size: 16px;
    font-family: Noto Sans SC;
    font-weight: 700;
    line-height: 22px;
    text-align: center; }
.LinkSecond { color: #FFF;
    font-family: Noto Sans SC;
    font-size: 13px;
    font-weight: 350;
    line-height: 22px;
    margin-top: 6px;
    text-align: center;
    white-space: nowrap; /* 防止文本换行 */ }
.Block { display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px; }
.RecentList ul,
  .MytaskList ul { 
    width: auto;
    padding: 0;
    margin: 0;
    margin-left: 25%;
    margin-top: 6px;
    text-align: center; }
.box1 { z-index: 2; }
.BottomBar { position: fixed;
    bottom: 0;
    left: 17.5%; /* 对齐 Sidebar 的最右侧 */
    right: 0; /* 延伸至页面最右端 */
    height: 3%;
    background: black;
    opacity: 0.30;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 元素右对齐 */ }
.TextBox2 {
    z-index: 3;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
    margin-right: 4%;  
    width: auto;
    color: #FFF;
}
.BottombarBox { display: flex;
    align-items: center;
    justify-content: flex-end; /* 元素右对齐 */
    margin-right: 20px; /* 与页面右侧保持 20px 距离 */ }
.Data155,
  .Data,
  .PseudoText { text-align: center;
    color: black;
    font-size: 11px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 14.85px;
    word-wrap: break-word; }
.DataImage,
  .Image { width: 24px;
    height: 24px; }
.DataInput { display: flex;
    align-items: center;
    margin-left: 20px; /* 与前一个元素保持 20px 距离 */ }
.Input { padding: 5.33px 10px;
    background: white;
    display: flex;
    align-items: center; }
.Pseudo { width: 24px;
    height: 13.33px;
    padding: 0.33px 11px 0 0;
    display: flex;
    align-items: center; }
.Data { margin-left: 20px; /* 与前一个元素保持 20px 距离 */ }

.Bar1 { width: 1093px;
    height: 40px;
    position: relative; }
.DataTableBodyRowData { width: 203px;
    height: 39px;
    left: 1px;
    top: 0px;
    position: absolute;
    justify-content: center;
    align-items: center;
    display: inline-flex; }
.DataTableBodyRowDataEmphasis { padding-left: 7px;
    padding-right: 17px;
    background-image: url(https://via.placeholder.com/44x20);
    justify-content: center;
    align-items: flex-start;
    display: inline-flex; }
.DataTableBodyRowDataEmphasis .Button { width: 20px;
    height: 20px;
    position: inherit; }
.Searchbox {
    right: 5%;
    top: 7.5%;
    position: absolute;
    padding: 10px; /* 设置内边距 */
    outline: none; /* 移除聚焦时的外边框 */
}
.SearchLogo { width: 13.56px;
    height: 13.57px;
    position: relative; }
.SearchLogo .Vector { width: 10.49px;
    height: 10.49px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: white;
    border: 0.76px #40414A solid; }
.SearchLogo .Vector:last-child { width: 5.43px;
    height: 5.23px;
    left: 8.14px;
    top: 8.34px;
    background: #40414A; }
.AlltaskText { width: 47px;
    left: 84px;
    top: 2px;
    position: absolute;
    opacity: 0.60;
    text-align: center;
    color: #808080;
    font-size: 11px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 14.85px;
    word-wrap: break-word; }
.OrderLogo { width: 24px;
    height: 24px;
    left: 1013px;
    top: 4px;
    position: absolute; }
.MoreLogo { width: 24px;
    height: 24px;
    left: 1051px;
    top: 4px;
    position: absolute; }
.Bar2 { width: 1061px;
    height: 18px;
    position: relative; }
/* ... 添加 Bar2 内部元素的样式 ... */
  








.Context { height: auto;
  left: 17.5%;
  right: 0%;
  top: 20%;
  position: fixed;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex; }
  .NavBar1 { 
  margin-left: 4%;
  padding: 1% 6% 1% 6%;
  justify-content: space-between;
  align-items: center;
  gap: 150px;
  display: inline-flex; }
.NavBar { 
  width: 100%;
  margin: 0;
  padding: 1% 6% 1% 6%;
  justify-content: space-between;
  align-items: center;
  gap: 150px;
  display: inline-flex; }
.TextBox {
    width: auto;
    align-items: center;
    white-space: nowrap; /* 防止文本换行 */
}
.CheckerBox { padding: 3px 17px 3px 19px;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex; }
.PathLogo { width: 18px;
  height: 15px;
  background: #FFBA01; }
.ContextList { align-self: stretch;
  height: 159px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  display: flex; }
.Frame4,
.Frame6,
.Frame9,
.Frame10 { align-self: stretch;
  padding: 3px 1px;
  background: #D9D9D9;
  justify-content: space-between;
  align-items: center;
  gap: 122px;
  display: inline-flex; }
.Frame5 { align-self: stretch;
  padding: 3px 1px;
  background: white;
  justify-content: space-between;
  align-items: center;
  gap: 122px;
  display: inline-flex; }
.Checker { width: 12px;
  height: 12px;
  position: relative; }
.ContextText { width: 156px;
  color: #2F2F2F;
  font-size: 12px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word; }





  
  .scrollbar {
  position: fixed;
  top: 13%;
  left: 17.5%;
  right: 0;
  height: auto;
  bottom: 3%;
  background-color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: nowrap;
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;  
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 100px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.slide-space {
  margin: auto;
  padding: auto;
  position: absolute;
  top: 5%;
  left: 5%;
  bottom: 5%;
}
.textItem{
  color: #D9D9D9;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-start;
  white-space: normal;
}
</style>
