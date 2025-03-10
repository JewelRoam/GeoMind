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
            <h2>状态信息</h2>
            <div class="InfBarText">任务状态: {{ taskStatus.task_state }}</div>
            <div class="InfBarText">标记员id: {{ taskStatus.marker_id }}</div>
            <div class="InfBarText">审核员id: {{ taskStatus.assessor_id }}</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name: 'AdminTaskInfo',
    props:["taskId"],
    data() {
        return{
        task: {
            task_name: '',
            task_id: 0,
            organization: '',
            level: 0,
            area: '',
            start_time: '',
            end_time: '',
            task_content: '',
            price: 0
        },
        taskStatus: {
            task_state: 0,
            marker_id: 0,
            assessor_id: 0
        },
        status: 0, // 初始状态
        error: null, // 错误信息
        isDataLoaded: false,
        }
    },
    methods: {
    // 发起请求获取任务详情
    fetchTaskInformation(taskId) {
        console.log("开始获取任务详情");
        // 使用axios.all发送两个并行请求
        axios.all([
        axios.get(`http://10.112.244.193:8001/tasks/information?task_id=${taskId}`),
        axios.get(`http://10.112.244.193:8001/admincenter/tasks/status?task_id=${taskId}`)
        ])
        .then(axios.spread((taskResponse, statusResponse) => {
        // 检查两个请求的状态
        if (taskResponse.status === 200 && statusResponse.status === 200) {
            // 两个请求都成功，更新状态和任务详情
            this.status = 200;
            this.task = taskResponse.data.task;
            // 更新其他状态信息（例如任务状态等）
            this.taskStatus = statusResponse.data.task_status_info;
            this.isDataLoaded = true; // 数据加载完成，更新标志位
            console.log("获取成功！");
            // console.log(this.task)
        } else {
            // 至少一个请求失败
            this.status = 500;
        }
        }))
        .catch(error => {
        // 请求异常，设置错误消息
        this.status = 500;
        this.error = error.message || '请求出错，请稍后重试。';
        console.error(error);
        });
    },
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
