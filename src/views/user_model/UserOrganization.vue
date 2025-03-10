<template>
  <div>

    <div class="container">
      <div class="box">
        <UserSidebar :user_info="user_info" :currentRoute="currentRoute" />
        <div class="main-content">
          <div class="sub-box">
            <h3>我的组织</h3>
            <div class="sub-box-content">
              <!-- 显示已加入组织的信息 -->
              <h2>已加入的组织</h2>
              <table class="org-table">
                <thead>
                  <tr>
                    <th>组织名</th>
                    <th>ID</th>
                    <th>联系人</th>
                    <th>联系人ID</th>
                    <th>电话</th>
                    <th>组织等级</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="org in organizationsInfo" :key="org.id">
                    <td>{{ org.name }}</td>
                    <td>{{ org.id }}</td>
                    <td>{{ org.contactName }}</td>
                    <td>{{ org.contactId }}</td>
                    <td>{{ org.phone }}</td>
                    <td>{{ org.userLevel }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- 显示申请中的组织信息 -->
              <h2>申请中的组织</h2>
              <table class="org-table">
                <thead>
                  <tr>
                    <th>组织名</th>
                    <th>ID</th>
                    <th>联系人</th>
                    <th>联系人ID</th>
                    <th>电话</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="org in pendingOrganizationsInfo" :key="org.id">
                    <td>{{ org.name }}</td>
                    <td>{{ org.id }}</td>
                    <td>{{ org.contactName }}</td>
                    <td>{{ org.contactId }}</td>
                    <td>{{ org.phone }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="pagination">
                <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page }}</button>
              </div>
              <a href="/用户中心/我的组织/加入更多组织">
                <button class="load-more-button" @click="openJoinOrganizationModal">加入更多组织</button>
              </a>
            </div>


            <div class="sub-box">
  <h3>加入更多组织</h3>
  <div class="sub-box-content">
    <input type="text" v-model="orgIdToJoin" placeholder="输入组织 ID">
    <button @click="applyToJoinOrg">申请加入</button>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>

    <!-- "加入更多组织"页面的弹窗 -->
    <JoinOrganizationModal
      :showModal="showJoinOrganizationModal"
      @close="closeJoinOrganizationModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import JoinOrganizationModal from "../user_model/JoinOrganizationModal.vue"; // 引入"加入更多组织"页面的组件
import UserSidebar from '@/views/manage/SideBar/UserSideBar.vue'; 

export default {
  components: {
    JoinOrganizationModal,
    UserSidebar, // Register the Sidebar component

  },
  data() {
    const user_id = sessionStorage.getItem('user_info.id');

    return {
      currentRoute: '/user/organization', // Initialize currentRoute as needed
      organizationsInfo: [],
      // 存储申请中的组织的信息
      pendingOrganizationsInfo: [],
      displayedOrganizations: [], // 存储要显示的组织信息
      showJoinOrganizationModal: false, // 控制弹窗显示/隐藏
      orgIdToJoin: '', // 存储用户输入的组织 ID
      user_info: {
      id: user_id,
      },
    };
  },
  
  methods: {
    activateTab(tab) {
      this.activeTab = tab;
    },

    async fetchOrganizationInfo() {
  try {
    const user_id = sessionStorage.getItem('user_info.id');
    const response = await axios.post('http://10.112.244.193:8002/usercenter/myorg/show', {
      user_id
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.status === 200) {
      const hasJoinData = JSON.parse(response.data.has_join); // Parse JSON string
      if (hasJoinData && hasJoinData.length > 0) {
        this.organizationsInfo = hasJoinData.map(org => ({
          name: org.name,
          id: org.id,
          contactName: org.contact_name,
          contactId: org.contact_id,
          phone: org.phone,
          userLevel: org.user_level
        }));
      } else {
        console.log('No organizations found in has_join data');
      }
    } else {
      console.error('Failed to fetch organization info. Status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching organization info:', error);
  }
},

async fetchPendingOrganizationInfo() {
  try {
    const user_id = sessionStorage.getItem('user_info.id');
    const response = await axios.post('http://10.112.244.193:8002/usercenter/myorg/show', {
      user_id
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status === 200) {
      const applyData = JSON.parse(response.data.apply); // Parse JSON string
      if (applyData && applyData.length > 0) {
        this.pendingOrganizationsInfo = applyData.map(org => ({
          name: org.name,
          id: org.id,
          contactName: org.contact_name,
          contactId: org.contact_id,
          phone: org.phone
          // userLevel is not included as it's not present in apply data
        }));
      } else {
        console.log('No pending organizations found in apply data');
      }
    } else {
      console.error('Failed to fetch pending organization info. Status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching pending organization info:', error);
  }
},



  async applyToJoinOrg() {
    try {
      const user_id = sessionStorage.getItem('user_info.id');  // 获取 user_id
      const org_id = this.orgIdToJoin;  // 获取绑定到输入框的组织 ID

      // 准备发送的数据
      const payload = {
        user_id,
        org_id
      };

      // 发送 POST 请求
      const response = await axios.post('http://10.112.244.193:8000/usercenter/myorg/apply', payload);

      // 检查响应，可能还要添加其他逻辑
      if (response.data.status === 'success') {
        alert('成功申请加入组织');
        // 可能需要更新组织列表或执行其他操作
      } else {
        alert('申请失败：' + response.data.message);
      }
    } catch (error) {
      console.error('在申请加入组织时出错：', error);
      alert('申请加入组织时出现错误');
    }
  },
  openJoinOrganizationModal() {
      this.showJoinOrganizationModal = true;
    },
  closeJoinOrganizationModal() {
      this.showJoinOrganizationModal = false;
    },
  },
  
  created() {
  this.fetchOrganizationInfo();
  this.fetchPendingOrganizationInfo();
},

};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
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

        .table thead tr {
          background-color: white; /* Set the background color for the header row */
        }

        tbody tr:nth-child(even) {
          background-color: lightgray; /* Set the background color for even rows */
        }

        tbody tr:nth-child(odd) {
          background-color: white; /* Set the background color for odd rows */
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

/* 修改表格的颜色样式 */
.org-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd; /* 添加表格边框 */
}

.org-table th {
  background-color: #f2f2f2; /* 表头灰色背景 */
  border: 1px solid #ddd; /* 表头边框 */
  padding: 10px;
  text-align: left;
}

.org-table td {
  border: 1px solid #ddd; /* 单元格边框 */
  padding: 10px;
  text-align: left;
}

/* Style for table header */
.org-table thead th {
  background-color: rgb(232, 232, 232);
  /* Add other header styles if needed */
}

/* Style for odd rows */
.org-table tbody tr:nth-child(odd) {
  background-color: white;
  /* Add other odd row styles if needed */
}

/* Style for even rows */
.org-table tbody tr:nth-child(even) {
  background-color: lightgray; /* Or your desired gray color */
  /* Add other even row styles if needed */
}


/* ...其他样式保持不变... */
wsx
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

