<template>
    <div class="InfBarFrame">
        <div class="InfBarMainFrame">
            <h2>{{ task.task_name }}</h2>
            <div class="InfBarText">任务ID: {{ task.task_id }}</div>
            <div class="InfBarText">所属组织: {{ task.organization }}</div>
            <div class="InfBarText">任务级别: {{ task.level }}</div>
            <div class="InfBarText">所属地理区域: {{ task.area }}</div>
            <div class="InfBarText">发布时间: {{ task.start_time }}</div>
            <div class="InfBarText">截止时间: {{ task.end_time }}</div>
            <div class="InfBarText">任务内容: {{ task.task_content }}</div>
            <div class="InfBarText">任务定价: {{ task.price }}</div>
        </div>
        <!-- <router-link :to="`/user/task/list/4/annotator`"> -->
            <button @click="takeTask" class="InfBarSubFrame">
                <div class="InfBarSub_Text">接受任务</div>
                <div class="InfBarSub_IconCheck"></div>
            </button>
        <!-- </router-link> -->
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name: 'UserGetTaskInfo',
    props:["taskId"],
    data() {
      return {
      task: {
        task_name: '',
        task_id: 0,
        organization: '',
        level: 0,
        area: '',
        start_time: '',
        end_time: '',
        task_content: '',
        price: 0,
      },
      status: 0, // 初始状态
      user_id:'',
    };
    },
    methods: {
    // 发起请求获取任务详情
    fetchTaskInformation(taskId) {
      axios
        .get(`http://10.112.244.193:8001/tasks/information?task_id=${taskId}`)
        .then((response) => {
          if (response.status === 200) {
            // 请求成功，更新状态和任务详情
            this.task = response.data?.task || {};
            this.status = 200;
            console.log("获取成功！");
          } else {
            // 请求失败
            this.status = 500;
          }
        })
        .catch((error) => {
          // 请求异常
          this.status = 500;
          console.error(error);
        });
    },
    // 接取任务
    async takeTask() {
      this.user_id = sessionStorage.getItem('user_info.id');
      try {
      const url = 'http://10.112.244.193:8000/task/taken';
      const params = {
        task_id: this.taskId,
        user_id: this.user_id
      };

      const response = await axios.post(url, params);

      // 检查响应状态
      if(response.status === 200) {
        console.log("接取任务成功！");
        alert("接取任务成功！");
      } else if(response.status === 500) {
        alert('操作失败');
      }

      } catch (error) {
          console.error('请求错误', error);
      }
    }
    },
    mounted() {
    console.log("taskId:", this.taskId);
    this.fetchTaskInformation(this.taskId)
    },
}
</script>
<style scoped>
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
    height: 620px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);    
}

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
</style>