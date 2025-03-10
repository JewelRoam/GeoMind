<template>
  <div>
    

    <div class="container">
      <div class="box">
        <AdminSidebar />
        <div class="main-content">
          <div class="sub-box">
            <h3>我的信箱</h3>
            <div class="sub-box-content mail-list">
              <div class="mail-item" @click="openMail(1)">
                <strong>邮件标题 1</strong>
                <p>发件人：JohnDoe</p>
                <p>时间：2023-09-10 10:00</p>
              </div>
              <div class="mail-item" @click="openMail(2)">
                <strong>邮件标题 2</strong>
                <p>发件人：JaneSmith</p>
                <p>时间：2023-09-11 12:30</p>
              </div>
              <!-- ... 更多邮件项目 ... -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mail-content" v-if="mailDetail">
      <h3>{{ mailDetail.title }}</h3>
      <p>发件人：{{ mailDetail.sender }}</p>
      <p>时间：{{ mailDetail.timestamp }}</p>
      <p>邮件正文：{{ mailDetail.body }}</p>
      <p><a :href="`user_mailbox_details.html?mailId=${mailId}`">查看详情</a></p>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/views/manage/SideBar/AdminSideBar.vue';

export default {
  components:{
    AdminSidebar
  },
  data() {
    return {
      activeTab: 'my-mailbox',
      mailDetail: null,
    };
  },
  methods: {
    activateTab(tabId) {
      this.activeTab = tabId;
    },
    openMail(mailId) {
      // 模拟从后端获取邮件详情的函数
      this.mailDetail = {
        title: `邮件标题 ${mailId}`,
        sender: '发件人：JohnDoe',
        timestamp: '时间：2023-09-10 10:00',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec.',
      };
    },
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
            align-items: center; /* 添加垂直居中 */
            height: 100%; /* 不再减去 100px，不启用滚动条 */
        }
        .box {
            width: 80%;
            min-height: 600px; /* 修改为最小高度 */
            display: flex;
            margin-bottom: 20px;
        }
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
            position: relative; /* 添加相对定位 */
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
            /* 添加以下样式以使其在固定容器下滑动 */
            flex-grow: 1;
            background-color: #f1f1f1;
            padding: 15px;
            box-sizing: border-box;
            overflow-y: auto; /* 启用垂直滚动 */
            max-height: calc(100vh - 80px); /* 限制高度以避免覆盖顶部栏 */
            margin-top: 80px; /* 顶部栏的高度 */
        }
        .sub-box {
            flex-grow: 1;
            /* 删除背景颜色和边框 */
            padding: 0;
            box-sizing: border-box;
            /* 删除边框 */
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
            /* 删除背景颜色和边框 */
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
            margin-right: 20px; /* 添加水平间隔 */
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
            text-decoration: none !important; /* 使用 !important 阻止其他样式的覆盖 */
        }

        .top-bar a.no-underline:after {
            content: none; /* 删除头像链接的下划线 */
        }
         .mail-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .mail-item {
            border: 1px solid #4C4444;
            padding: 10px;
            cursor: pointer;
        }

        .mail-item:hover {
            background-color: #f1f1f1;
        }

    </style>