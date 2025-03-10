<template>
    <!-- 导航条 -->
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo head"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
      <el-menu-item index="0" class="front-color">
        <div class="custom-text">
          <span>国脉山河</span>
          <span class="subtext">在线协作式地图标注平台</span>
        </div>
      </el-menu-item>


        <div class="flex-grow" />
        <router-link to="/admin/map"><el-menu-item index="1" class="front-color">查看地图</el-menu-item></router-link>
        
        <router-link to="/admin/task_list"><el-menu-item index="2" class="front-color">任务列表</el-menu-item></router-link>
        <router-link to="/admin/work"><el-menu-item index="3" class="front-color">新建任务</el-menu-item></router-link>
        <router-link to="/admin/point/center"><el-menu-item index="4" class="front-color">经济统计</el-menu-item></router-link>
        <router-link to="/admin/info"> <el-menu-item index="5" class="front-color">个人中心</el-menu-item></router-link>
        <router-link to="/" @click="handleLogout"> <el-menu-item index="6" class="front-color">登出</el-menu-item></router-link>

        
       
        <div class="demo-type" style="margin-right: 10px;">
          <div>
            <el-avatar :icon="UserFilled" />
          </div>
        </div>
        
      </el-menu>
      <!-- <RouterView></RouterView> -->
    </template>
    
    <script>
    import { ref } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router';
    
    export default {
      setup() {
        const activeIndex = ref('1')
        const router = useRouter();
    
        const handleLogout = () => {
          // 清除 sessionStorage 或 localStorage
          sessionStorage.clear();
          localStorage.clear();
          
          // 跳转到指定页面，比如根目录 "/"
          router.push('/');
    
          // 其他退出逻辑，比如发送请求到服务器等
        };
    
        return {
          activeIndex,
          handleLogout
        };
      }
    };
    </script>    

    <style scoped>
    .head {
      background-color: black;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000; /* 根据需要设置合适的 z-index 值 */
      height: 60px; /* 设置顶栏的高度 */
      font-size: 16px; /* 设置字体大小 */
      padding: 0px 20px; /* 设置内边距 */
    }
    .front-color{
      color: white;
    }
    /* Custom Text Container */
    /* Custom Text Container */
    .custom-text {
      position: absolute;
      width: 100%;
      left:5px;
      top: -19px; /* 向上移动元素以适应 60px 的顶栏高度 */
      text-align: center;
    }

    /* Text "国脉山河" */
    .custom-text span:first-child {
      display: inline-block;
      height: 32px;
      font-family: 'STZhongsong';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #FFFFFF;
      position: relative;
    }

    /* White Underline for "国脉山河" */
    .custom-text span:first-child::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background: #FFFFFF;
      opacity: 0.9;
    }

    /* Text "在线协作式地图标注平台" */
    .custom-text span:last-child {
      width: auto;
      height: 12px;
      top: 3px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: rgba(222, 222, 222, 0.9);
      position: relative; /* 添加相对定位 */
      display: block; /* 将其变为块级元素 */
    }

    .flex-grow {
      flex-grow: 1;
    }
    .demo-type {
      display: flex;
    }
    .demo-type > div {
      flex: 1;
      text-align: center;
      margin-top: 9px;
    }
    
    .demo-type > div:not(:last-child) {
      border-right: 1px solid var(--el-border-color);
    }
    </style>
    