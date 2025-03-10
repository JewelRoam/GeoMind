<template>
  <div>
    

    <div class="container">
      <div class="box">
        <AdminSidebar />
        <div class="main-content">
          <div v-if="activeTab === 'org-management'">
            <div class="sub-box">
            <h3>组织管理</h3>
            <div class="sub-box-content">
              <!-- <table>
                <thead>
                  <tr>
                    <th>组织名称</th>
                    <th>组织ID</th>
                    <th>组织最大人数</th>
                    <th>组织人数</th>
                    <th>组织区域</th>
                    <th>组织级别</th>
                    <th>组织简介</th>
                    <th>组织联系电话</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ organizationInfo.name }}</td>
                    <td>{{ organizationInfo.id }}</td>
                    <td>{{ organizationInfo.max_person }}</td>
                    <td>{{ organizationInfo.real_person }}</td>
                    <td>{{ organizationInfo.area }}</td>
                    <td>{{ organizationInfo.organization_level }}</td>
                    <td>{{ organizationInfo.introduction }}</td>
                    <td>{{ organizationInfo.phone }}</td>
                  </tr>
                </tbody>
              </table> -->
              <div>
                <p><strong>组织名称:</strong> {{ organizationInfo.name }}</p>
                <p><strong>组织ID:</strong> {{ organizationInfo.id }}</p>
                <p><strong>组织最大人数:</strong> {{ organizationInfo.max_person }}</p>
                <p><strong>组织人数:</strong> {{ organizationInfo.real_person }}</p>
                <p><strong>组织区域:</strong> {{ organizationInfo.area }}</p>
                <p><strong>组织级别:</strong> {{ organizationInfo.organization_level }}</p>
                <p><strong>组织简介:</strong> {{ organizationInfo.introduction }}</p>
                <p><strong>组织联系电话:</strong> {{ organizationInfo.phone }}</p>
              </div>

            </div>

            <!-- 下属组织信息 -->
            <h3>下属组织信息</h3>
            <div class="sub-box-content">
              <!-- 表格来显示下属组织信息 -->
              <table>
                <!-- 表头 -->
                <thead>
                  <tr>
                    <th>组织名称</th>
                    <th>组织ID</th>
                    <th>组织详细地址</th>
                    <th>组织人数</th>
                    <th>管理员</th>
                    <th>联系电话</th>
                    <th>成立日期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <!-- 表格数据 -->
                <tbody>
                  <tr v-for="subOrg in subOrganizationInfo" :key="subOrg.id">
                    <td>{{ subOrg.name }}</td>
                    <td>{{ subOrg.id }}</td>
                    <td>{{ subOrg.address }}</td>
                    <td>{{ subOrg.memberCount }}</td>
                    <td>{{ subOrg.admin }}</td>
                    <td>{{ subOrg.contact }}</td>
                    <td>{{ subOrg.establishedDate }}</td>
                    <td>
                      <a :href="'/查看管辖范围/' + subOrg.id">查看管辖范围</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 其他标签和内容在这里（个人信息等） -->
        </div>
      </div>
    </div>
  </div>
   </div>
</template>

<script>
import axios from 'axios';
import AdminSidebar from '@/views/manage/SideBar/AdminSideBar.vue';

export default {
  components:{
    AdminSidebar
  },
  data() {
    return {
      activeTab: 'org-management', // 默认显示组织管理标签
      organizationInfo: {
      name: '北邮拆迁队', // Initialize with default values or empty strings
      id: 123, // Initialize with default values or null
      max_person: 100, // Initialize with default values or null
      real_person: 50, // Initialize with default values or null
      area: '北京市海淀区', // Initialize with default values or empty strings
      organization_level: 2, // Initialize with default values or null
      introduction: '', // Initialize with default values or empty strings
      phone: '10086' // Initialize with default values or empty strings
    },
    };
  },
  mounted() {
    // 在页面加载时调用获取组织信息的方法，例如 this.fetchOrganizationInfo() 和 this.fetchSubOrganizationInfo()
    this.fetchOrganizationInfo();
    //this.fetchSubOrganizationInfo();
  },
  created() {
  // 在这里调用你的函数
  this.fetchOrganizationInfo(); // 调用你的函数，例如 fetchOrganizationInfo
},
  methods: {
    activateTab(tab) {
      this.activeTab = tab;
    },
    // 在这里添加获取直辖组织和下属组织信息的方法，例如 fetchOrganizationInfo() 和 fetchSubOrganizationInfo()
    async fetchOrganizationInfo() {
      try {
        const admin_id = sessionStorage.getItem('admin_info.id');
        const response = await axios.post('http://10.112.244.193:8002/admincenter/myorg/direct_orginfo', {
          admin_id
        },{
          headers: {
            'Content-Type': 'application/json',
          },
        });

    if (response.data.status === 200) {
      const responseData = response.data.data;
      this.organizationInfo = {
        name: responseData.name,
        id: responseData.id,
        max_person: responseData.max_person,
        real_person: responseData.real_person,
        area: responseData.area,
        organization_level: responseData.organization_level,
        introduction: responseData.introduction,
        phone: responseData.phone
      };
    } else {
      console.error('Failed to fetch direct organization info. Status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching direct organization info:', error);
  }
},
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
            align-items: center; /* 添加垂直居中 */
            height: 100%; /* 不再减去 100px，不启用滚动条 */
        }
        .box {
            width: 80%;
            min-height: 600px; /* 修改为最小高度 */
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


 
    </style>
