<template>
  <el-container>
    <img class="BackgroundImage" />

<div class="sidebar">      
  <div class="SearchBar">
        <!-- 搜索框 -->
        <input v-model="searchTerm" placeholder="搜索任务名或任务ID" />
        <button @click="searchTasks">搜索</button>
  </div>
  
  <!-- <div class="Frame36">
      <div class="Group58">
          <div class="Rectangle117"></div>
          <div class="LabelText">众包任务</div>
      </div>
      <div class="Group59">
          <div class="Rectangle118"></div>
          <div class="LabelText">指定任务</div>
      </div>
  </div>     -->
  
  
      <div class="Group44">
        <!-- 显示从API获取的数据 -->
        <div v-for="task in filteredTasks" :key="task.task_id">
          <router-link :to="'/annotator/get/task/info/' + task.task_id"><div class="Frame4">
            <div class="IcFolderSvg"><img src="@/assets/images/标注员/path-logo.png"></div>
            <div class="Text">{{ task.task_name }}</div>
            <div class="Id">ID:{{ task.task_id }}</div>
            <div class="Status">定价：{{ task.price }}</div>
          </div></router-link>
        </div>
    </div>
  
</div>

  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_id: 0,
      tasks: [], // 存储从API获取的任务数据
      searchTerm: '', // 搜索关键字
      isLoading: true,
      errorMessage: ''
    };
  },
  computed: {
  filteredTasks() {
    const searchTerm = this.searchTerm.toLowerCase();

    // Check if tasks is defined, if not, return an empty array
    if (!this.tasks || !Array.isArray(this.tasks)) {
      return [];
    }

    return this.tasks.reduce((filtered, task) => {
      // Check if any property contains the searchTerm (case-insensitive)
      const containsSearchTerm = Object.values(task).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );

      // If any property contains the searchTerm, add the task to the filtered array
      if (containsSearchTerm) {
        filtered.push(task);
      }

      return filtered;
    }, []);
  }
},
  mounted() {
    this.fetchUserId();
    // 在组件挂载后发送GET请求
    this.fetchAvailableTasks();
    // 在tasks数组中添加第一个任务的数据
    // this.addFirstTask();
  },
  methods: {
    fetchUserId() {
      this.user_id = sessionStorage.getItem('user_info.id');
    },
    fetchAvailableTasks() {
      axios.get('http://10.112.244.193:8001/tasks/search', {
        params: {
          user_id: this.user_id
        }
      })
      .then(response => {
        // 请求成功时将数据存储到tasks中
        this.tasks = response.data.tasks;
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
    },
    // 在tasks数组中添加第一个任务的函数
    addFirstTask() {
      const newTask = {
        task_name: '任务一',
        task_id: 1,
        org_id: 123,
        level: 1,
        area: '地理区域',
        start_time: '2023-10-08',
        end_time: '2023-10-15',
        price: 50,
        status: 200
      };

      // 将新任务添加到tasks数组的开头
      this.tasks.unshift(newTask);
    },
  },
};
</script>

<style scoped>
    .BackgroundImage {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%; 
    height: 100%; 
    background-image: url('@/assets/images/background-image.png');
    background-size: cover; 
    background-position: center; 
    position: fixed;
    opacity: 1;
    z-index: -1;
  }



.InfBarFrame {
    display: flex;
    width: 260px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 38px;
    position: fixed;
    top: 15%; 
    left: 5%;
}

.InfBarMainFrame {
    width: 260px;
    height: 550px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);    
}

/* .InfBarBase {
    width: 260px;
    height: 694px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    filter: blur(2px);
} */

.InfBarText {
    width: 141px;
    color: #000;
    font-family: Noto Sans SC;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center; /* 可选，如果需要文本水平居中 */
}

.InfBarSubFrame {
    width: 237px;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: #81D25C;
}

/* .InfBarSubBase {
    width: 237px;
    height: 47px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #81D25C;
    filter: blur(2px);
} */

.InfBarSub_IconCheck {
    background-image: url('@/assets/images/icon _check_.png');
    width: 29.669px;
    height: 24px;
    flex-shrink: 0;
    z-index: 2;
}

.InfBarSub_Text {
    width: 125px;
    height: 24px;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Noto Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center; /* 可选，如果需要文本水平居中 */
    z-index: 2;
}

.ToolBarBase {
    width: 720px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    filter: blur(2px);
}




.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  flex-shrink: 0;
  background: #fff;
  opacity: 0.90;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  padding: 20px;
}
.Group44 {
  width: 329px;
  height: auto;
  top: auto;
  position: static;
}

.Frame4, .Frame5, .Frame6, .Frame9, .Frame10 {
  width: 329px;
  height: 27px;
  padding-left: 1px;
  padding-right: 1px;
  padding-top: 3px;
  padding-bottom: 3px;
  left: 0px;
  position: static;
  background: #D9D9D9;
  justify-content: flex-start;
  align-items: center;
  gap: 36px;
  display: inline-flex;
  z-index: 3;
}

.IcFolderSvg {
  padding-top: 0.50px;
  padding-bottom: 0.50px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
}

.Path1 {
  width: 18px;
  height: 15px;
  background: #FFBA01;
}

.Text, .Id, .Status {
  color: #2F2F2F;
  font-size: 12px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 21px;
  word-wrap: break-word;
}

.SearchBar {
  width: 307px;
  height: 84px;
  position: relative;
}

.Frame27 {
  width: 214.49px;
  height: 24px;
  left: 77px;
  top: 60px;
  position: static;
}

.DataTableBodyRowDataEmphasisButton {
  width: 24px;
  height: 24px;
  position: absolute;
}

.Input {
  /* padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 6px;
  padding-right: 10px; */
  left: 0px;
  top: 0px;
  height: auto;
  position: absolute;
  background: #D9D9D9;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  display: inline-flex;
}

.IconSearchSvg {
  width: 24px;
  height: 25px;
  padding-top: 0.45px;
  padding-bottom: 0.55px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
}

.Group {
  width: 24px;
  height: 24px;
  position: relative;
}

.Vector {
  width: 24px;
  height: 24px;
  left: 0px;
  top: 0px;
  position: absolute;
}

.Pseudo {
  width: 261px;
  align-self: stretch;
  padding-top: 2px;
  padding-bottom: 1px;
  /* padding-right: 178px; */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  color: black;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;
}

.Frame36 {
  width: 301px;
  height: 60px;
  top: auto;
  justify-content: center;
  align-items: flex-start;
  gap: 31px;
  display: inline-flex;
}

.Group58, .Group59 {
  width: 140px;
  height: 46px;
  position: relative;
}

.Rectangle117, .Rectangle118 {
  width: 140px;
  height: 47px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: #D9D9D9;
}

.LabelText {
  width: 139px;
  height: 47px;
  left: 0px;
  top: 0px;
  position: absolute;
  text-align: center;
  color: black;
  font-size: 16px;
  font-family: Noto Sans SC;
  font-weight: 350;
  line-height: 48.87px;
  word-wrap: break-word;
}

</style>