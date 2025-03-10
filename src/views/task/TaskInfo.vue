<template>
    <div id="BackgroundImage" alt="任务总览图"></div>

    <div v-if="isReadyToRender">
      <AdminTaskInfo v-if="role==='0' || role===null" v-bind:taskId="taskid"/>
      <UserGetTaskInfo v-else-if="role==='2'" v-bind:taskId="taskid"/>
    </div>
</template>

<script>
import AdminTaskInfo from './AdminTaskInfo.vue';
import UserGetTaskInfo from './UserGetTaskInfo.vue';

export default {
  components:{
    AdminTaskInfo,
    UserGetTaskInfo
  },
  data() {
    return {
      role: -1,
      taskid: 0,
      isReadyToRender: false,
      task_picture: ''
    };
  },
  methods: {
    fetchUserRole() {
      this.role = sessionStorage.getItem('user_info.role');
      console.log("role:", this.role)
    },
    storeBackground() {
      this.task_picture = "url('http://10.112.244.193:8001/task/thumbnail?task_id=" + this.taskid + "')"
    }
  },
  mounted() {
    this.taskid = this.$route.params.taskId;
    this.fetchUserRole();
    this.storeBackground();
    this.isReadyToRender = true;
  }
};
</script>

<style scoped>
  #BackgroundImage {
    width: 100%; 
    height: 100%; 
    background-image: v-bind(task_picture);
    background-size: cover; 
    background-position: center; 
    position: fixed;
    opacity: 1;
    z-index: -1;
  }
</style>