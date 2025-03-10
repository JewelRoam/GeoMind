<template>
  <div>
    <img class="BackgroundImage" />
    <SideBar v-bind:tasks="tasks"/>
    
    <div class="BottomBar">
      <div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="BottomBar">
          <div class="TextBox2" v-if="taskCount > 0">任务总共：{{ taskCount }}</div>
        </div>
      </div>
    </div>

    <div class="Context">
      <div class="NavBar1">
        <div class="TextBox"><img src="@/assets/images/标注员/path-logo.png"></div>
        <div class="TextBox">任务名</div>
        <div class="TextBox">创建日期</div>
        <!-- <div class="TextBox">完成度</div> -->
        <div class="TextBox">截止日期</div>
      </div>
      <!-- <router-link :to="'/work/'+role"> -->
        <div class="NavBar" v-for="task in tasks" :key="task.task_id" @click="change(task.task_id)">
          <div class="TextBox"><img src="@/assets/images/标注员/path-logo.png"></div>
          <div class="TextBox">{{ task.task_name }}</div>
          <div class="TextBox">{{ task.start_time }}</div>
          <!-- <div class="TextBox">未完成</div> -->
          <div class="TextBox">{{ task.end_time }}</div>
        </div>
      <!-- </router-link> -->
    </div>
  
  
    <div class="NdTopbar">
      <div class="Searchbox">
        <div>
          <!-- 搜索框，使用v-model绑定到searchInput变量 -->
          <input type="text" v-model="searchInput" placeholder="搜索任务">
  
          <!-- 显示符合搜索条件的任务 -->
          <div v-for="(task, index) in filteredTasks" :key="index">
            {{ task.task_name }} <!-- 这里假设任务对象有一个'name'属性，你可以根据实际情况修改 -->
          </div>
        </div>
      </div>
      <!-- <div class="Bar2">
      </div> -->
    </div>
  </div>
</template>

<script>
import SideBar from './layout/SideBar.vue'

const axios = require('axios');
export default {
  name: 'UserTask',
  components: {
    SideBar
  },
  data() {
    return {
      task: {
        task_name: '', // String，任务名
        task_id: 0, // Number，任务id
        org_id: 0, // Number，所属组织ID
        level: 0, // Number，任务级别
        area: '', // String，所属地理区域
        start_time: '', // String，发布时间
        end_time: '', // String，截止时间
        price: 0, // Number，任务定价
      },
      taskCount: 0, // 存储任务数量的变量
      errorMessage: '', // 存储错误消息的变量
      searchInput: '', // 存储搜索框的输入值
      role : 0,   // 存储用户的职能
      user_id:'',   //接收用户id
    };
  },
  methods: {
    change(taskId) {
      if (this.role === 'annotator') {
        this.$router.push({
          name:'annotator_work',
          params:{
          taskId: taskId,
          }
        })
      }
      else if (this.role === 'checker') {
        this.$router.push({
          name:'checker_work',
          params:{
          taskId: taskId,
          }
        })
      } else {
        return;
      }
    },
    getRole() {
      axios.post('http://10.112.244.193:8002/usercenter/userinfo/show', {
        user_id:this.user_id  
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const data = response.data;
        var role_ch = data.user_info.role
        if(role_ch == "审核员"){
          this.role = 'checker'
        }
        else{
          this.role = 'annotator'
        }
           // 获取职能
        // console.log('职能：',this.role)
      })
      .catch(error => {
        console.error('获取任务失败:', error);
        // 将错误消息存储在errorMessage变量中
        this.errorMessage = '获取任务失败，请稍后重试。';
      });

      
    },
    getTasks() {
      const userId = sessionStorage.getItem('user_info.id');
      console.log('userId:',userId);
      axios.get('http://10.112.244.193:8001/tasks/general', {
        params: {
          // user_id: this.user_id   // 切换
          user_id: userId
        }
      })
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data && data.tasks) {
            // 将获取的任务数据存储在tasks数组中
            this.tasks = data.tasks;
            // 更新任务计数
            this.taskCount = this.tasks.length;
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
  },
  computed: {
    // 使用计算属性过滤符合搜索条件的任务
    filteredTasks() {
      const searchQuery = this.searchInput.toLowerCase(); // 将搜索框的输入值转换为小写
      if (!this.tasks || this.tasks.length === 0) {
        return [];
      }
      // 使用filter方法过滤符合搜索条件的任务
      return this.tasks.filter(task => task && task.name?.toLowerCase().includes(searchQuery));
    },
  },
  mounted() {
    // 在页面加载时，调用获取任务数据的方法
    this.getTasks();   
    this.user_id = this.$route.params.id;
    // console.log('user_id:',this.user_id)
    this.getRole();
  },
};
</script>

<style scoped>
.BackgroundImage { top: 60px;
  left:0;
  right: 0;
    width: 100%; 
    height: 100%; 
    /* padding-bottom: calc(1034 / 1707 * 100%);  */
    background-image: url('@/assets/images/标注员/background-image.png');
    background-size: cover; 
    background-position: center; 
    position: fixed;
    opacity: 0.50; }

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
.NdTopbar { /* width: 1094px; */
    height: 10%;
    left: 17.5%;
    right: 0;
    top: 10%;
    position: fixed;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    background: white;
    opacity: 0.30;
    display: inline-flex; }
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
    position: relative; }
.Searchbox {
    right: 5%;
    top: 10%;
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

</style>