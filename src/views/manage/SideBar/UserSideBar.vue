<!-- UserSidebar.vue -->
<template>
    <div class="sidebar">
      <ul>
        <li :class="{ active: currentRoute.includes('user/info') }">
          <RouterLink :to="'/user/info/' + user_info.id">我的信息</RouterLink>
        </li>
        <li :class="{ active: currentRoute === '/user/organization' }">
          <RouterLink to="/user/organization">我的组织</RouterLink>
        </li>
        <li :class="{ active: currentRoute.includes('user/task') }">
          <router-link :to="'/user/task/list/' + user_info.id">我的任务</router-link>
        </li>
        <li :class="{ active: currentRoute === '/user/mailbox' }">
          <RouterLink to="/user/mailbox">我的信箱</RouterLink>
        </li>
        <li :class="{ active: currentRoute === '/settings' }"><a href="#settings">设置</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user_info: Object, // pass user_info as a prop
      currentRoute: String, // pass the current route as a prop
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the sidebar as needed */
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
    color: white;
    font-size: 18px;
    position: relative;
    cursor: pointer;
  }
  
  .sidebar ul li.active {
    background-color: #4C4444;
  }
  
  .sidebar ul li:not(.active) {
    background-color: #998888;
  }
  
  .sidebar ul li a {
    color: white;
    text-decoration: none;
  }
  
  .sidebar ul li a:hover {
    text-decoration: underline;
  }
  </style>
  