<template>
  <div>
    

    <div class="container">
      <div class="box">
        <!-- <div class="sidebar">
          <ul>
            <li id="my-info"  style="background-color: #4C4444;"><RouterLink to="'/user/info/'+user_info.id">我的信息</RouterLink></li>
            <li id="my-org" ><RouterLink to="/user/organization">我的组织</RouterLink></li>
            <li id="my-tasks" ><router-link :to= "'/user/task/list/'+user_info.id">我的任务</router-link></li>
            <li id="my-mailbox" ><RouterLink to="/user/mailbox">我的信箱</RouterLink></li>
            <li id="settings" ><a href="#settings">设置</a></li>
          </ul>
        </div> -->
        <UserSidebar :user_info="user_info" :currentRoute="currentRoute" />
        <div class="main-content">
          <div class="sub-box">
            <h3>用户信息</h3>
            <div class="sub-box-content">
              <div class="editable-field">
                <span>用户名：</span>
                <input type="text" id="username" v-model="user_info.name">
                <button @click="editUsername">修改</button>
              </div>
              <div class="editable-field">
                <span id="user-id">用户ID：</span>
                <span>{{ user_info.id }}</span>
              </div>
              <div class="editable-field">
                <span id="user-role">用户类型：</span>
                <span>{{ user_info.role }}</span>
              </div>

              <div class="editable-field">
                <span>所属组织：</span>
                <span>{{ user_info.organization }}</span>
              </div>
              <div class="editable-field">
                <span>联系电话：</span>
                <input type="text" id="phone" :value="user_info.phone">
                <button @click="updatePhone">更新</button>
              </div>
              <div class="editable-field">
                <span>邮箱：</span>
                <input type="email" id="mail" :value="user_info.email">
                <button @click="updateEmail">更新</button>
              </div>
            </div>
          </div>
          <div class="sub-box">
            <h3>身份信息</h3>
            <div class="sub-box-content">
              <div class="editable-field">
                <span>姓名：</span>
                <span>{{ user_info.true_name }}</span>
              </div>
              <div class="editable-field">
                <span>性别：</span>
                <span>{{ user_info.gender }}</span>
              </div>
              <div class="editable-field">
                <span>出生日期：</span>
                <span>{{ user_info.birthdate }}</span>
              </div>
              <div class="editable-field">
                <span>证件类型：</span>
                <span>{{ user_info.document_type }}</span>
              </div>
              <div class="editable-field">
                <span>证件号码：</span>
                <span>{{ user_info.id_card }}</span>
              </div>
              <div class="editable-field">
                <span>所属区域：</span>
                <span>{{ user_info.address }}</span>
              </div>
              <p style="text-align: center; margin-top: 10px;">如需修改，请联系管理员。</p>
            </div>
          </div>
          <div class="sub-box">
            <h3>密码修改</h3>
            <div class="sub-box-content">
              <form @submit="changePassword">
                <label for="oldPassword">旧密码：</label>
                <input type="password" id="oldPassword" v-model="oldPassword" required><br>

                <label for="newPassword">新密码：</label>
                <input type="password" id="newPassword" v-model="newPassword" required><br>

                <label for="confirmPassword">确认新密码：</label>
                <input type="password" id="confirmPassword" v-model="confirmNewPassword" required><br>

                <input type="submit" value="提交">
              </form>
              <p id="message">{{ passwordChangeMessage }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="main-content">
      <MainContent :sections="mainContentSections" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { inject,watch } from 'vue'
import UserSidebar from '@/views/manage/SideBar/UserSideBar.vue'; 
import MainContent from '@/views/manage/main_content.vue';


export default {
  components: {
    UserSidebar, // Register the Sidebar component
    MainContent,
  },
  data() {
  return {
    currentRoute: '/user/info/', // Initialize currentRoute as needed
    shouldShowAdminHead: false, // 设置初始值为false，即默认不显示
    user_info: {
      id: '123456',
      name: 'JohnDoe',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      create_time: '2023-01-15',
      role: "审核员",
      status: 'active',
      level:2,
      organization: 'ABC Corporation',
      privileges: 'standard',
      true_name: '身份证对应',
      gender: "女",
      address: '123 Main Street',
      birthdate: '1990-05-15',
      id_card: 'A123456789',
      password: 'secretpassword',
      document_type: '身份证',
    },
    oldPassword: '', // 存储旧密码
    newPassword: '', // 存储新密码
    confirmPassword: '', // 存储确认新密码
    passwordChangeMessage: '', // 存储密码修改结果消息
    user_id:'',
    mainContentSections: [
      {
        title: '用户信息',
        fields: [
          {
            label: '用户名',
            type: 'text',
            id: 'username',
            value: 'JohnDoe', // Initial value
            action: this.editUsername,
            buttonText: '修改',
          },
          {
            label: '用户ID',
            type: 'span',
            id: 'user-id',
            value: '123456', // Initial value
          },
          {
            label: '用户类型',
            type: 'span',
            id: 'user-role',
            value: '审核员', // Initial value
          },
          {
            label: '所属组织',
            type: 'span',
            id: 'user-organization',
            value: 'ABC Corporation', // Initial value
          },
          {
            label: '联系电话',
            type: 'text',
            id: 'phone',
            value: '123-456-7890', // Initial value
            action: this.updatePhone,
            buttonText: '更新',
          },
          {
            label: '邮箱',
            type: 'email',
            id: 'mail',
            value: 'johndoe@example.com', // Initial value
            action: this.updateEmail,
            buttonText: '更新',
          },
        ],
      },
      {
        title: '身份信息',
        fields: [
          {
            label: '姓名',
            type: 'span',
            id: 'true-name',
            value: '身份证对应', // Initial value
          },
          {
            label: '性别',
            type: 'span',
            id: 'gender',
            value: '女', // Initial value
          },
          // ... other identity fields ...
        ],
      },
      {
        title: '密码修改',
        fields: [
          {
            label: '旧密码',
            type: 'password',
            id: 'oldPassword',
            value: '', // Initial value
          },
          {
            label: '新密码',
            type: 'password',
            id: 'newPassword',
            value: '', // Initial value
          },
          {
            label: '确认新密码',
            type: 'password',
            id: 'confirmPassword',
            value: '', // Initial value
          },
        ],
        action: this.changePassword,
        buttonText: '提交',
      },
    ],
  };
},
  computed: {
    userTypeText() {
      // 根据后端返回的数字用户类型转化为相应的文字描述
      const userTypeNumber = this.user_info.role;
      if (userTypeNumber === 1) {
        return '审核员';
      } else if (userTypeNumber === 2) {
        return '标注员';
      } else {
        return '未知类型'; // 可以根据实际情况提供默认描述
      }
    },

    genderText() {
      return this.user_info.gender === 1 ? '男' : (this.user_info.gender === 2 ? '女' : '未知性别');
    }
  },
  methods: {
    async  fetchUserInfo() {
    try {
     const user_id = sessionStorage.getItem('user_info.id');
      //const user_id = 1;
      const response = await axios.post('http://10.112.244.193:8002/usercenter/userinfo/show', {
        user_id  
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)

      if (response.status===200) {
        const data = await response.data;
        this.user_info.name = data.user_info.name;
        this.user_info.id = data.user_info.id;
        this.user_info.role = data.user_info.role;
        this.user_info.gender = data.user_info.gender;
        //this.user_info.level = data.user_info.level;
        //this.user_info.organization = data.user_info.organization;
        this.user_info.phone = data.user_info.phone;
        this.user_info.email = data.user_info.email;
        //this.user_info.create_time = data.user_info.create_time;
        //this.user_info.password = data.user_info.password;
       // this.user_info.status = data.status;
      } else {
        // 处理请求失败的情况
        console.error('获取用户信息失败');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  },
    async fetchOrganizationInfo() {
    try {
      const response = await axios.post('http://10.112.244.193:8002/usercenter/myorg/show', {
      user_id: this.user_info.id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.user_info.organization = data.user_info.organization;
        this.user_info.privileges = data.user_info.privileges;
        this.user_info.status = data.status;
      } else {
        // 处理请求失败的情况
        console.error('获取组织信息失败');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  },
    async fetchIdentityInfo() {
    try {
      const response = await fetch('http://10.112.244.193:8002/usercenter/userinfo/show', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.user_info.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.user_info.true_name = data.user_info.true_name;
        this.user_info.gender = data.user_info.gender;
        this.user_info.address = data.user_info.address;
        this.user_info.birthdate = data.user_info.birthdate;
        this.user_info.id_card = data.user_info.id_card;
        this.user_info.status = data.status;
      } else {
        // 处理请求失败的情况
        console.error('获取身份信息失败');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  },
    async editUsername() {
    try {
      const newUsername = this.user_info.name; // 获取新的用户名
      const userId = this.user_info.id; // 获取用户ID

      // 发送 POST 请求到后端来更新用户名
      const response = await axios.post('http://10.112.244.193:8002/usercenter/userinfo/changename', {
        newname: newUsername,
        id: userId
      });

      // 处理响应，检查是否成功更新用户名
      if (response.data.status === 'success') {
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

  },
  // setup() {
  //   const globalVars = inject('globalVars')
  //   watch(() => this.user_info, (newValue) => {
  //     // 更新自己的状态
  //     globalVars.user_id = newValue
  //     console.log('新用户:',globalVars.user_id)
  //   })
  // },
  mounted() {
    // 在组件挂载后调用初始化方法
    this.fetchUserInfo();
    console.log('组件:',this.$refs);
    // globalVars = this.user_info.id;
    // console.log('新用户:',globalVars.user_id);
    //this.fetchOrganizationInfo();
    //this.fetchIdentityInfo();
    //this.editUsername();
    //this.changePassword();
  },
  watch: {
  },
};
</script>

<style scoped >
        body, html {
            height: 100%;
            margin: 0;
            padding: 0;
      
        }
        .page-content {
  /* 设置页面内容容器的高度，留出顶栏和底栏的空间 */
  margin-top: 60px; /* 顶栏的高度 */
  margin-bottom: 40px; /* 底栏的高度 */
  /* 根据需要添加其他样式，比如背景色或滚动条等 */
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
    </style>

