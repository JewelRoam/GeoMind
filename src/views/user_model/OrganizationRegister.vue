<template>
  <div id="app">
    <div class="header">
      <div class="top-bar">
        <a href="#task-list">登录</a>
      </div>
    </div>

    <h1 style="text-align: center;">组织信息注册页面</h1>

    <div class="container">
      <div class="box">
        <h2>组织信息</h2>
        <form>
          <div class="input-row">
            <label for="orgName">组织名称:</label>
            <input type="text" id="orgName" v-model="organization_info.name" required>
          </div>
          <div class="input-row">
            <label for="orgAddress">组织地址:</label>
            <input type="text" id="orgAddress" v-model="organization_info.address" required>
          </div>
          <div class="input-row">
            <label for="orgMaxPerson">组织人数上限:</label>
            <input type="number" id="orgMaxPerson" v-model="organization_info.max_person" required>
          </div>
          <div class="input-row">
            <label for="orgPhone">组织联系电话:</label>
            <input type="tel" id="orgPhone" v-model="organization_info.phone" required>
          </div>
          <div class="input-row">
            <label for="orgLevel">组织权限等级:</label>
            <input type="text" id="orgLevel" v-model="organization_info.organization_level" required>
          </div>
        </form>
      </div>
    </div>

    <div class="button-container">
      <button @click="register" :disabled="!isRegistrationValid">注册</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      organization_info: {
        name: '',
        address: '',
        max_person: '',
        phone: '',
        organization_level: '',
      },
    };
  },
  computed: {
    isRegistrationValid() {
      // 进行注册信息的验证，确保所有必填字段都已填写
      return (
        this.organization_info.name &&
        this.organization_info.address &&
        this.organization_info.max_person &&
        this.organization_info.phone &&
        this.organization_info.organization_level
      );
    },
  },
  methods: {
    register() {
      if (this.isRegistrationValid) {
        // 构建注册请求数据
        const registrationData = {
          ...this.organization_info,
        };

        // 发送注册请求
        axios
          .post('http://10.112.244.193:8000/register/orginfo', registrationData)
          .then(() => {
            console.log('注册成功');
            // 可以在这里处理注册成功后的逻辑，如跳转到登录页面等
          })
          .catch((error) => {
            console.error('注册失败:', error);
            // 可以在这里处理注册失败后的逻辑，如显示错误信息等
          });
      } else {
        console.log('请填写完整的组织信息');
      }
    },
  },
};
</script>

<style >
body,html {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-image: url("../../assets/imgs/地图.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            margin-bottom: 20px;
        }

.box {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.input-row {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
}

.input-row label {
  width: 100px;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>





