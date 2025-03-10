<!-- AdminSidebar.vue -->

<template>
    <div class="sidebar">
      <ul>
        <li :style="{ backgroundColor: isActive('/admin/info') ? '#4C4444' : '' }">
          <RouterLink to="/admin/info">我的信息</RouterLink>
        </li>
        <li :style="{ backgroundColor: isActive('/admin/organization') ? '#4C4444' : '' }">
          <RouterLink to="/admin/organization">组织管理</RouterLink>
        </li>
        <li :style="{ backgroundColor: isActive('/admin/member') ? '#4C4444' : '' }">
          <RouterLink to="/admin/member">成员管理</RouterLink>
        </li>
        <li :style="{ backgroundColor: isActive('/admin/mailbox') ? '#4C4444' : '' }">
          <RouterLink to="/admin/mailbox">我的信箱</RouterLink>
        </li>
        <li :style="{ backgroundColor: isActive('#settings') ? '#4C4444' : '' }">
          <a href="#settings">设置</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router'; // Assuming you are using Vue Router

  export default {
    methods: {
      isActive(route) {
        return this.$route.path === route;
      },
    },
  };
  </script>
  
  <style scoped>
  /* AdminSidebar styles */
  .sidebar {
    width: 20%;
    padding: 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    margin-top: 80px;
  }
  
  .sidebar ul {
    padding: 0;
    margin: 0;
  }
  
  .sidebar ul li {
    margin: 10px 0;
    padding: 15px;
    text-align: center;
    background-color: #998888;
    color: white;
    font-size: 18px;
    position: relative;
  }
  
  .sidebar ul li.active {
    background-color: #4C4444;
  }
  
  .sidebar ul li a {
    color: white;
    text-decoration: none;
  }
  
  .sidebar ul li a:hover {
    text-decoration: underline;
  }
  </style>
  