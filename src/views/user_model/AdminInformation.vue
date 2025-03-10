<template>
  <div >
    
    <AdminHead></AdminHead>
    <div class="container" >
      <div class="box">
        <!-- <div class="sidebar">
            <ul>
              <li id="my-info"  style="background-color: #4C4444;">
                <RouterLink to="/admin/info">我的信息</RouterLink>
              </li>
              <li id="org-management" >
                <RouterLink to="/admin/organization">组织管理</RouterLink>
              </li>
              <li id="member-management" >
                <RouterLink to="/admin/member">成员管理</RouterLink>
              </li>
              <li id="my-mailbox" >
                <RouterLink to="/admin/mailbox">我的信箱</RouterLink>
              </li>
              <li id="settings" >
                <a href="#settings">设置</a>
              </li>
            </ul>
        </div> -->
        <AdminSidebar />
        <div class="main-content">
          <div class="sub-box">
            <h3>管理员信息</h3>
            <div class="sub-box-content">
              <div class="editable-field">
                <span>用户名：</span>
                <input type="text" id="name" v-model="admin_info.name">
                <button @click="editAdminname">修改</button>
              </div>
              <div class="editable-field">
                <span id="admin-id">管理员ID：</span>
                <span>{{ admin_info.id }}</span>
              </div>
              <div class="editable-field">
                <span id="admin-level">等级权限：</span>
                <span>{{ admin_info.level }}</span>
              </div>
              <div class="editable-field">
                <span>所属组织：</span>
                <span>{{ admin_info.organization }}</span>
              </div>
              <div class="editable-field">
                <span>联系电话：</span>
                <input type="text" id="phone" :value="admin_info.phone">
                <button @click="updatePhone">更新</button>
              </div>
              <div class="editable-field">
                <span>邮箱：</span>
                <input type="email" id="mail" :value="admin_info.email">
                <button @click="updateEmail">更新</button>
              </div>
            </div>
          </div>
          <div class="sub-box">
            <h3>身份信息</h3>
            <div class="sub-box-content">
              <div class="editable-field">
                <span>姓名：</span>
                <span>{{ admin_info.name }}</span>
              </div>
              <div class="editable-field">
                <span>性别：</span>
                <span>{{ genderText }}</span>
              </div>
              <div class="editable-field">
                <span>出生日期：</span>
                <span>{{ admin_info.birth_date }}</span>
              </div>
              <div class="editable-field">
                <span>证件类型：身份证</span>
                <span>{{ admin_info.document_type }}</span>
              </div>
              <div class="editable-field">
                <span>证件号码：</span>
                <span>{{ admin_info.id_card }}</span>
              </div>
              <div class="editable-field">
                <span>所属区域：</span>
                <span>{{ admin_info.address }}</span>
              </div>
              <p style="text-align: center; margin-top: 10px;">如需修改，请联系管理员。</p>
            </div>
          </div>
          <div class="sub-box">
            <h3>密码修改</h3>
            <div class="sub-box-content">
              <form @submit.prevent="changePassword">
                <label for="oldPassword">旧密码：</label>
                <div class="password-container">
                  <input type="password" id="oldPassword" v-model="oldPassword" required>
                  <font-awesome-icon :icon="['fas', showOldPassword ? 'eye-slash' : 'eye']" @click="togglePasswordVisibility('oldPassword')" />
                </div><br>

                <label for="newPassword">新密码：</label>
                <div class="password-container">
                  <input type="password" id="newPassword" v-model="newPassword" required>
                  <font-awesome-icon :icon="['fas', showNewPassword ? 'eye-slash' : 'eye']" @click="togglePasswordVisibility('newPassword')" />
                </div><br>

                <label for="confirmPassword">确认新密码：</label>
                <div class="password-container">
                  <input type="password" id="confirmPassword" v-model="confirmNewPassword" required>
                  <font-awesome-icon :icon="['fas', showConfirmPassword ? 'eye-slash' : 'eye']" @click="togglePasswordVisibility('confirmNewPassword')" />
                </div><br>

                <input type="submit" value="提交">
              </form>
              <p id="message">{{ passwordChangeMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AdminSidebar from '@/views/manage/SideBar/AdminSideBar.vue';
export default {
 
  components:{
    FontAwesomeIcon,
    AdminSidebar
  },
  data() {
  return {
    shouldShowAdminHead: true,
    admin_info: {
      id: '',
      name: '',
      phone: '',
      email: '',
      create_time: '',
      //type: '',
      status: '',
      organization: '',
      privileges: '',
      true_name: '',
      gender: '',
      address: '',
      birth_date: '',
      id_card: '',
      password:''
    },
    oldPassword: '', // 存储旧密码
    newPassword: '', // 存储新密码
    confirmPassword: '', // 存储确认新密码
    passwordChangeMessage: '', // 存储密码修改结果消息

    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  };
},
computed: {
    genderText() {
      return this.admin_info.gender === 1 ? '男' : (this.admin_info.gender === 2 ? '女' : '未知性别');
    }
  },
  mounted() {
    this.fetchAdminInfo();
  //  this.fetchAdminOrgInfo(); // 获取管理员组织信息
    //this.editAdminname();
    //this.changePassword();
  },
  methods: {
    handleLogout() {
      // 清除 sessionStorage 或 localStorage
      sessionStorage.clear();
      localStorage.clear();
      //window.location.reload();

      // 其他退出逻辑，比如发送请求到服务器等
    },
    async fetchAdminInfo() {
  try {
    const admin_id = sessionStorage.getItem('admin_info.id');
    const response = await axios.post('http://10.112.244.193:8002/admincenter/myinfo/show', {
      admin_id 
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = response.data;
      this.admin_info.name = data.admin_info.name;
      this.admin_info.id = data.admin_info.id;
      this.admin_info.type = data.admin_info.type;
      this.admin_info.admin_level = data.admin_info.admin_level;
      this.admin_info.organization = data.admin_info.organization;
      this.admin_info.phone = data.admin_info.phone;
      this.admin_info.email = data.admin_info.email;
      this.admin_info.create_time = data.admin_info.create_time;
      this.admin_info.gender = data.admin_info.gender;
      this.admin_info.address = data.admin_info.address;
      this.admin_info.birth_date = data.admin_info.birth_date;
      this.admin_info.id_card = data.admin_info.id_card;
      this.admin_info.password = data.admin_info.password;
      //this.admin_info.status = data.status;
    } else {
      // 处理请求失败的情况
      console.error('获取管理员信息失败');
    }
  } catch (error) {
    console.error('发生错误', error);
  }
},

// async fetchOrganizationInfo() {
//   try {
//     const admin_id = sessionStorage.getItem('admin_info.id'); 
//     const response = await axios.post('http://10.112.244.193:8002/admincenter/myorg/direct_orginfo', {
//       admin_id: this.admin_info.id
//     });

//     if (response.status === 200) {
//       const responseData = response.data;
//       this.organizationInfo = {
//         name: responseData.name,
//         id: responseData.id,
//         max_person: responseData.max_person,
//         real_person: responseData.real_person,
//         area: responseData.area,
//         organization_level: responseData.organization_level,
//         introduction: responseData.introduction,
//         phone: responseData.phone
//       };
//     } else {
//       console.error('Failed to fetch direct organization info. Status:', response.status);
//     }
//   } catch (error) {
//     console.error('Error fetching direct organization info:', error);
//   }
// },

    
    async editAdminname() {
    try {
      const newAdminname = this.admin_info.name; // 获取新的用户名
      const adminId = this.admin_info.id; // 获取管理员ID

      // 发送 POST 请求到后端来更新用户名
      const response = await axios.post('http://10.112.244.193:8002/admincenter/myinfo/changename', {
        new_name: newAdminname,
        admin_id: adminId
      });

      // 处理响应，检查是否成功更新用户名
      if (response.data.status === 200) {
        // 更新成功，您可以在此处执行一些操作，例如显示成功消息
        alert('用户名已成功更新！');
      } else {
        // 更新失败，处理失败情况，例如显示错误消息
        alert('用户名更新失败，请稍后重试。');
      }
    } catch (error) {
      // 处理请求错误
      console.error('修改用户名时发生错误：', error);
    }
  },

  togglePasswordVisibility(field) {
    const inputField = document.getElementById(field);
    if (inputField.type === 'password') {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  },

  async changePassword() {
  try {
    console.log('this.admin_info.password:', this.admin_info.password);
    console.log('oldPassword:', oldPassword.toString());

    // 验证新密码和确认密码是否匹配
    if (this.newPassword !== this.confirmNewPassword) {
      throw new Error('新密码和重复密码不匹配');
    }

    // 发送新密码和旧密码到后端
    const response = await axios.post('http://10.112.244.193:8002/admincenter/myinfo/change_password', {
      admin_id: this.admin_info.id,
      old_password: this.oldPassword.toString(),
      new_password: this.newPassword.toString(),
    });

    console.log('status:', response.status);

    if (response.data.status === 200) {
      alert('密码修改成功！');
      // 清空输入框
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    } else if (response.data.status === 500) {
          alert('修改失败，请检查原密码输入。');
        } else {
          alert('修改失败，请检查原密码输入。');
        }
  } catch (error) {
    console.error('修改密码时出错：', error);
    alert(error.message);
  }
}


  }
};
</script>

<style scoped>

body, html {
            height: 100%;
            margin-top: 60px; /* 顶栏的高度 */
            margin-bottom: 40px; /* 底栏的高度 */
            position: fixed;

            background-color: #f0f0f0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
            background-size: 30px 30px;
            background-position: -5px -5px;
        }


        .container {
            display: flex;
            justify-content: center;
            align-items: center; /* 添加垂直居中 */
            height: calc(100% - 100px); /* 不再减去 100px，不启用滚动条 */
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

    </style>
