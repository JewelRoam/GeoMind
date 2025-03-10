<template>
  <div>
    

    <div class="container">
      <div class="box">
        <AdminSidebar />
        <div class="main-content">
  <div v-if="activeTab === 'org-management'">
  <div class="sub-box">
    <h3>标注员信息</h3>
    <div class="search-bar">
      <input type="text" v-model="searchAnnotator" placeholder="搜索用户名或用户ID" />
      <button @click="searchAnnotators">{{ searchButtonAnnotator }}</button>
    </div>
    <div class="sub-box-content">
      <!-- 表格来显示标注员信息 -->
      <table>
        <!-- 表头 -->
        <thead>
          <tr>
            <th>姓名</th>
            <th>用户ID</th>
            <th>联系电话</th>
            <th>权限等级</th>
            <th>备注</th> <!-- 新增备注列 -->
          </tr>
        </thead>
        <!-- 表格数据 -->
        <tbody>
          <tr v-for="(annotator, index) in annotators" :key="annotator.userId">
            <td>{{ annotator.userName }}</td>
            <td>{{ annotator.userId }}</td>
            <td>{{ annotator.userPhone }}</td>
            <td>{{ annotator.userLevel }}</td>
            <td>{{ annotator.userNotes }}</td> <!-- 显示备注信息 -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sub-box">
    <h3>审核员信息</h3>
    <div class="search-bar">
      <input type="text" v-model="searchChecker" placeholder="搜索用户名或用户ID" />
      <button @click="searchcheckers">{{ searchButtonChecker }}</button>
    </div>

    <div class="sub-box-content">
      <!-- 表格来显示审核员信息 -->
      <table>
        <!-- 表头 -->
        <thead>
          <tr>
            <th>姓名</th>
            <th>用户ID</th>
            <th>联系电话</th>
            <th>权限等级</th>
            <th>备注</th> <!-- 新增备注列 -->
          </tr>
        </thead>
        <!-- 表格数据 -->
        <tbody>
          <tr v-for="checker in checkers" :key="checker.userId">
            <td>{{ checker.userName }}</td>
            <td>{{ checker.userId }}</td>
            <td>{{ checker.userPhone }}</td>
            <td>{{ checker.userLevel }}</td>
            <td>{{ checker.userNotes }}</td> <!-- 显示备注信息 -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sub-box">
  <h3>下级管理员信息</h3>
  <div class="search-bar">
    <input type="text" v-model="searchadmin" placeholder="搜索用户名或用户ID" />
    <button @click="searchadmins">{{ searchButtonadmin }}</button>
  </div>
  <div class="sub-box-content">
    <!-- 表格来显示下级管理员信息 -->
    <table>
      <!-- 表头 -->
      <thead>
        <tr>
          <th>姓名</th>
          <th>用户ID</th>
          <th>联系电话</th>
          <th>权限等级</th>
          <th>管理员位置</th>
          <th>管理组织</th>
          <th>备注</th>
        </tr>
      </thead>
      <!-- 表格数据 -->
      <tbody>
        <tr v-for="admin in subordinateAdmins" :key="admin.adminId">
          <td>{{ admin.adminName }}</td>
          <td>{{ admin.adminId }}</td>
          <td>{{ admin.adminPhone }}</td>
          <td>{{ admin.adminLevel }}</td>
          <td>{{ admin.adminPosition }}</td>
          <td>{{ admin.adminOrganization }}</td>
          <td>{{ admin.adminNotes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
  </div>
    </div>
  </div>
   </div>
</template>

<script>
import axios from "axios";
import AdminSidebar from '@/views/manage/SideBar/AdminSideBar.vue';

export default {
  components:{
    AdminSidebar
  },
  created() {
    this.fetchUserInfo();
    this.fetchSubordinateAdmins();
  },
  data() {
    return {
      activeTab: 'org-management',
      organizationInfo: [],
      subOrganizationInfo: [],
      //annotators: [],
      checkersInfo: [],
      adminsInfo: [],
      searchAnnotator: '', // 标注员搜索关键字
      searchChecker: '', // 审核员搜索关键字
      searchAdmin: '', // 管理员搜索关键字
      searchButtonAnnotator: '搜索', // 标注员搜索按钮文本，默认为搜索
      searchButtonChecker: '搜索', // 审核员搜索按钮文本，默认为搜索
      searchButtonAdmin: '搜索', // 管理员搜索按钮文本，默认为搜索
      annotators: [
  {
    userName: 'John Doe',
    userId: '12345',
    userPhone: '555-123-4567',
    userLevel: '1',
    userNotes: 'None'
  },
  {
    userName: 'Alice Smith',
    userId: '67890',
    userPhone: '555-567-8901',
    userLevel: '2',
    userNotes: 'Some notes'
  },
  {
    userName: 'Bob Johnson',
    userId: '54321',
    userPhone: '555-987-6543',
    userLevel: '1',
    userNotes: 'Additional notes'
  },
  {
    userName: 'Eve Anderson',
    userId: '98765',
    userPhone: '555-543-2109',
    userLevel: '3',
    userNotes: 'More notes'
  },
],

    checkers: [
      {
        userName: 'Jane Smith',
        userId: '54321',
        userPhone: '555-987-6543',
        userLevel: '2',
        userNotes: 'None'
      },
      // 添加更多审核员数据
    ],
    subordinateAdmins: [
      {
        adminName: 'Alice Johnson',
        adminId: '7890',
        adminPhone: '555-567-8901',
        adminLevel: '3',
        adminPosition: 'Manager',
        adminOrganization: 'Organization A',
        adminNotes: 'None'
      },
    ]
    };

},
  methods: {
    activateTab(tab) {
      this.activeTab = tab;
    },
    // 在这里添加获取直辖组织和下属组织信息的方法，例如 fetchOrganizationInfo() 和 fetchSubOrganizationInfo()
    searchAnnotators() {
  if (this.searchButtonAnnotator === '搜索') {
    // 用户点击搜索按钮
    this.searchButtonAnnotator = '取消搜索';

    // 保存原始标注员信息以备恢复
    this.originalannotators = [...this.annotators];

    // 处理搜索逻辑，更新标注员信息列表
    this.annotators = this.originalannotators.filter((annotator) => {
      // Check if name and id are defined before using 'includes'
      if (annotator && annotator.userName && annotator.userId) {
        return (
          annotator.userName.includes(this.searchAnnotator) ||
          annotator.userId.toString().includes(this.searchAnnotator)
        );
      }
      return false;
    });
  } else {
    // 用户点击取消搜索按钮
    this.searchButtonAnnotator = '搜索';

    // 恢复原有的标注员信息列表
    this.searchAnnotator = ''; // 清空搜索关键字
    this.annotators = [...this.originalannotators]; // 恢复原有信息
  }
},


  // 修改搜索审核员信息
searchcheckers() {
    console.log('searchChecker:', this.searchChecker); // 输出搜索关键字
    console.log('checkersInfo:', this.checkersInfo); // 输出审核员信息数据
  if (this.searchButtonchecker === '搜索') {
    // 用户点击搜索按钮

    this.searchButtonchecker = '取消搜索';
    // 保存原始审核员信息以备恢复
    this.originalcheckersInfo = [...this.checkersInfo];
    // 处理搜索逻辑，更新审核员信息列表
    const searchKeyword = this.searchchecker.toLowerCase(); // 转换为小写以进行不区分大小写的搜索
    this.checkersInfo = this.originalcheckersInfo.filter(checker => {
      const nameMatch = checker.name.toLowerCase().includes(searchKeyword);
      const idMatch = checker.id.toString().includes(searchKeyword);
      return nameMatch || idMatch;
    });
  } else {
    // 用户点击取消搜索按钮
    this.searchButtonchecker = '搜索';
    // 恢复原有的审核员信息列表
    this.searchchecker = ''; // 清空搜索关键字
    this.checkersInfo = [...this.originalcheckersInfo]; // 恢复原有信息
  }
},


  // 搜索管理员信息
  searchadmins() {
    
    if (this.searchButtonadmin === '搜索') {
      // 用户点击搜索按钮

      this.searchButtonadmin = '取消搜索';
      // 保存原始管理员信息以备恢复
      this.originaladminsInfo = [...this.adminsInfo];
      // 处理搜索逻辑，更新管理员信息列表
      this.adminsInfo = this.adminsInfo.filter(admin => {
        return (
          admin.name.includes(this.searchadmin) ||
          admin.id.toString().includes(this.searchadmin)
        );
      });
    } else {
      // 用户点击取消搜索按钮
      this.searchButtonadmin = '搜索';
      // 恢复原有的管理员信息列表
      this.searchadmin = ''; // 清空搜索关键字
      this.adminsInfo = [...this.originaladminsInfo]; // 恢复原有信息
    }
  },

  async fetchUserInfo() {
  const admin_id = sessionStorage.getItem('admin_info.id');
  //console.log('fetchUserInfo 方法被调用'); // 添加日志
  try {
    const response = await axios.post('http://10.112.244.193:8002/admincenter/mymember/Annotator', {
      admin_id
    });

    if (response.data.status === 200) {
      const user_info = JSON.parse(response.data.user_info);

      // 清空数组
      //this.annotators = [];
      this.checkers = [];

      for (const userInfo of user_info) {
        const userDetail = {
          userName: userInfo.name,
          userId: userInfo.id,
          userPhone: userInfo.phone,
          userLevel: userInfo.level,
          userNotes: userInfo.user_notes,
          userRole: userInfo.role
        };

        if (userInfo.role === '标注员') {
          this.annotators.push(userDetail);  // 添加到标注员数组
        } else if (userInfo.role === '审核员') {
          this.checkers.push(userDetail);  // 添加到审核员数组
        }
      }

    } else {
      console.error('获取用户信息失败:', response.data.status);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
},



  async fetchSubordinateAdmins() {
      const admin_id = sessionStorage.getItem('admin_info.id');

      try {
        const response = await axios.post('http://10.112.244.193:8002/admincenter/mymember/Admin', {
          admin_id
        });

        if (response.data.status === 200) {
          const adminInfo = response.data.admin_info;
          // 解构 adminInfo 对象中的属性
          const {
            name,
            id,
            phone,
            admin_level,
            position,
            organization,
            admin_notes
          } = adminInfo;

          // 创建一个下级管理员的对象
          const subordinateAdmin = {
            adminName: name,
            adminId: id,
            adminPhone: phone,
            adminLevel: admin_level,
            adminPosition: position,
            adminOrganization: organization,
            adminNotes: admin_notes
          };

          // 将下级管理员对象添加到数组中
          this.subordinateAdmins.push(subordinateAdmin);
        } else {
          console.error('获取下级管理员信息失败:', response.data.status);
        }
      } catch (error) {
        console.error('请求失败:', error);
      }
    },
  },
  

    mounted() {
      this.originalannotators = [...this.annotators];
      this.originalcheckersInfo = [...this.checkersInfo];
      this.originaladminsInfo = [...this.adminsInfo];

      // 使用箭头函数以确保正确的上下文绑定
      const fetchUserInfoPromise = this.fetchUserInfo();
      const fetchSubordinateAdminsPromise = this.fetchSubordinateAdmins();

      // 等待两个异步操作完成
      Promise.all([fetchUserInfoPromise, fetchSubordinateAdminsPromise])
        .then(() => {
          // 这里可以进行一些在两个异步操作完成后执行的操作
        })
        .catch((error) => {
          // 处理错误
          console.error('获取用户信息或下级管理员信息失败:', error);
        });
    }

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
            /* 移除margin-bottom: 20px; */
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
        /* Add this to your CSS stylesheet */
        .table thead tr {
          background-color: white; /* Set the background color for the header row */
        }

        tbody tr:nth-child(even) {
          background-color: rgb(226, 226, 226); /* Set the background color for even rows */
        }

        tbody tr:nth-child(odd) {
          background-color: white; /* Set the background color for odd rows */
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
        .editable-field input[type="text"] {
          flex-grow: 1;
          border: 1px solid #ccc; /* 添加边框样式 */
          padding: 5px; /* 添加内边距 */
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
        /* 添加表格样式 */
        table {
          border-collapse: collapse;
          width: 100%;
        }

        /* 添加表格边框 */
        table, th, td {
          border: 1px solid #ccc;
        }

        /* 加粗第一行 */
        table thead th {
          font-weight: bold;
          background-color: #f1f1f1;
        }

        /* 移除第一行的底边框 */
        table thead th:last-child {
          border-bottom: none;
        }
    </style>
