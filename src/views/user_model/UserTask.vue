<template>
  <div>
   
    <div class="container">
      <div class="box">
        <div class="sidebar">
          <h2>Menu</h2>
          <ul>
            
            <li id="my-info"  ><RouterLink to="/用户中心/我的信息">我的信息</RouterLink></li>
            <li id="my-org" ><RouterLink to="/用户中心/我的组织">我的组织</RouterLink></li>
            <li id="my-tasks" style="background-color: #4C4444;"><RouterLink to="/用户中心/我的任务">我的任务</RouterLink></li>
            <li id="my-mailbox"  ><RouterLink to="/用户中心/我的信箱">我的信箱</RouterLink></li>

            <li ><a href="#settings">设置</a></li>
          </ul>
        </div>
        <div class="main-content">
          <div class="sub-box">
            <h3>我的组织</h3>
            <div class="sub-box-content">
              <ul class="org-list">
                <li v-for="org in displayedOrganizations" :key="org.id" class="org-item">
                  <strong>组织名：</strong>{{ org.name }}<br />
                  <strong>区域：</strong>{{ org.region }}<br />
                  <strong>联系人：</strong>{{ org.contact }}<br />
                  <strong>电话：</strong>{{ org.phone }}<br />
                  <strong>加入时间：</strong>{{ org.joinDate }}<br />
                  <strong>状态：</strong>{{ org.status }}<br />
                  <strong>操作：</strong>{{ org.action }}<br />
                </li>
              </ul>
              <div class="pagination">
                <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page }}</button>
              </div>
              <a href="/用户中心/我的组织/加入更多组织">
                <button class="load-more-button" @click="openModal">加入更多组织</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'my-org',
      organizations: [], // 存储组织数据
      currentPage: 1, // 当前页码
      organizationsPerPage: 5, // 每页显示的组织数量
    };
  },
  computed: {
    // 根据当前页和每页显示数量计算分页后的组织数据
    displayedOrganizations() {
      const startIndex = (this.currentPage - 1) * this.organizationsPerPage;
      const endIndex = startIndex + this.organizationsPerPage;
      return this.organizations.slice(startIndex, endIndex);
    },
    // 计算总页数
    totalPages() {
      return Math.ceil(this.organizations.length / this.organizationsPerPage);
    },
  },
  methods: {
    // 激活选项卡
    activateTab(tabId) {
      this.activeTab = tabId;
    },
    // 加载更多组织
    loadMoreOrganizations() {
      this.currentPage++;
    },
    // 打开模态框
    openModal() {
      // 实现打开模态框的逻辑
    },
    // 改变页码
    changePage(page) {
      this.currentPage = page;
    },
    // 模拟加载组织数据
    loadOrganizations() {
      // 模拟数据
      this.organizations = [
        // 组织数据（名称、区域、联系人、电话、加入时间、状态等）
      ];
    },
  },
  created() {
    // 在组件创建时加载组织数据
    this.loadOrganizations();
  },
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url("../../assets/imgs/地图.png"); /* 背景图片路径 */
            background-size: cover; /* 使背景图片铺满整个页面 */
            background-repeat: no-repeat; /* 防止背景图片重复 */
            background-attachment: fixed; /* 使背景图片固定不滚动 */
}

.header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.box {
  width: 80%;
  min-height: 600px;
  display: flex;
  margin-bottom: 20px;
}

.sidebar {
  width: 20%;
  padding: 15px;
  box-sizing: border-box;
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

.main-content {
  flex-grow: 1;
  background-color: #f1f1f1;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sub-box {
  flex-grow: 1;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.sub-box h3 {
  margin: 0;
  padding: 10px;
  background-color: #4C4444;
  color: white;
  border: 1px solid #4C4444;
  border-bottom: none;
}

.sub-box-content {
  border-top: 1px solid #4C4444;
  padding: 15px;
  flex-grow: 1;
  box-sizing: border-box;
}

.editable-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.editable-field input[type="text"],
.editable-field input[type="email"] {
  flex-grow: 1;
}

.editable-field button {
  background-color: #4C4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

/* 新增样式 */
.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
}

.top-bar a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  position: relative;
  margin-right: 20px;
}

.top-bar a:after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  margin-top: 2px;
  position: absolute;
  bottom: -4px;
  left: 0;
}

.top-bar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.no-underline {
  text-decoration: none !important;
}

.top-bar a.no-underline:after {
  content: none;
}

.org-list {
  list-style: none;
  padding: 0;
}

.org-item {
  border: 1px solid #4C4444;
  padding: 10px;
  margin-bottom: 10px;
}

.pagination {
  margin-top: 10px;
}

.load-more-button {
  display: block;
  margin: 20px auto;
  background-color: #6D7F42;
  color: white;
  border: none;
  text-decoration: none;
  border-radius: 90px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
