<template>
  <div id="login-container">

    <h1 style="text-align: center;margin-top: 100px;">管理员注册页面</h1>

    <!-- 账号信息 -->
    <div class="container">
      <div class="box">
      <h2>账号信息</h2>
      <form class="form">
        <div class="input-row">
          <!-- <label for="adminname">用户名:</label> -->
          <input type="text" id="adminname" class="input" v-model="admin_info.name" required>
          <span>用户名</span>
        </div>
        <div class="input-row">
          <!-- <label for="password">密码:</label> -->
          <input type="password" id="password" class="input" v-model="admin_info.password" required>
          <span>密码</span>
        </div>
        <div class="input-row">
          <!-- <label for="repeatPassword">重复密码:</label> -->
          <input type="password" id="repeatPassword" class="input" v-model="repeatPassword" required>
          <span>重复密码</span>
        </div>
        <div class="input-row">
          <!-- <label for="email">邮箱:</label> -->
          <input type="email" id="email" class="input" v-model="admin_info.email" required>
          <span>邮箱</span>
        </div>
        <div class="input-row">
          <!-- <label for="phone">手机号:</label> -->
          <input type="tel" id="phone" class="input" v-model="admin_info.phone" required>
          <span>手机号</span>
        </div>
        
      </form>
    </div>

    <!-- 身份信息 -->
    <div class="box">
      <h2>身份信息</h2>
      <form class="form">
        <div class="input-row">
          <!-- <label for="realName">真实姓名:</label> -->
          <input type="text" id="realName" class="input" v-model="admin_info.true_name" required>
          <span>真实姓名</span>
        </div>
        <div class="input-row">
          <label for="gender" class="name">性别:</label>
          <select id="gender" class="select" v-model="admin_info.gender" required>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="input-row">
          <!-- <label for="idCard">身份证号:</label> -->
          <input type="text" id="idCard" class="input" v-model="admin_info.id_card" required>
          <span>身份证号</span>
        </div>
        <div class="input-row">
          <label for="birthDate" class="name">出生日期:</label>
          <input type="date" id="birthDate" class="select" v-model="admin_info.birth_date" required>
        </div>
        <div class="input-row">
          <label for="province" class="name">省份:</label>
          <select id="province" class="select" v-model="selectedProvince" @change="updateCities">
              <option v-for="province in provinces" :value="province">{{ province }}</option>
          </select>
          
          <label for="city" class="name">城市:</label>
          <select id="city" class="select" v-model="selectedCity" @change="updateDistricts">
              <option v-for="city in cities" :value="city">{{ city }}</option>
          </select>
          
          <label for="district" class="name">区域:</label>
          <select id="district" class="select" v-model="admin_info.address">
              <option v-for="district in districts" :value="district">{{ district }}</option>
          </select>
      </div>
        <div class="input-row">
          <label for="introduction" class="name">简介:</label>
          <textarea id="introduction" style="background-color: #333;width: 100%;padding: 10px;color: #fff;" v-model="admin_info.introduction"></textarea>
        </div>
      </form>
    </div>

    <!-- 注册按钮 -->
    <div>
      <button @click="register" class="submit" :disabled="!isRegistrationValid">注册</button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      provinces: [
            "北京市",     // 11
            "天津市",     // 12
            "河北省",     // 13
            "山西省",     // 14
            "内蒙古自治区", // 15
            "辽宁省",     // 21
            "吉林省",     // 22
            "黑龙江省",    // 23
            "上海市",     // 31
            "江苏省",     // 32
            "浙江省",     // 33
            "安徽省",     // 34
            "福建省",     // 35
            "江西省",     // 36
            "山东省",     // 37
            "河南省",     // 41
            "湖北省",     // 42
            "湖南省",     // 43
            "广东省",     // 44
            "广西壮族自治区", // 45
            "海南省",     // 46
            "重庆市",     // 50
            "四川省",     // 51
            "贵州省",     // 52
            "云南省",     // 53
            "西藏自治区",   // 54
            "陕西省",     // 61
            "甘肃省",     // 62
            "青海省",     // 63
            "宁夏回族自治区", // 64
            "新疆维吾尔自治区", // 65
            "香港特别行政区",   // 81
            "澳门特别行政区"    // 82
        ],
            cities: [],  // 初始为空，基于选中的省份进行填充
            districts: [],  // 初始为空，基于选中的城市进行填充
            selectedProvince: null,  
            selectedCity: null,
            admin_info: {
                address: null
            },
      admin_info: {
        name: '',
        password: '',
        email: '',
        phone: '',
        true_name: '',
        gender: '男',
        id_card: '',
        birth_date: '',
        address: '',
        introduction: '',
        role: ''
      },
      repeatPassword: ''
    };
  },
  computed: {
    isRegistrationValid() {
      // 进行注册信息的验证，确保所有必填字段都已填写且密码一致等
      return (
        this.admin_info.name &&
        this.admin_info.password &&
        this.repeatPassword === this.admin_info.password &&
        this.admin_info.email &&
        this.admin_info.phone &&
        this.admin_info.true_name &&
        this.admin_info.gender &&
        this.admin_info.id_card &&
        this.admin_info.birth_date &&
        this.admin_info.address &&
        this.admin_info.role // 确保用户类型也选择了
      );
    }
  },
  methods: {
    register() {
      if (this.isRegistrationValid) {
        // 构建注册请求数据
        const registrationData = {
          ...this.admin_info,
         // repeatPassword: this.repeatPassword,
        };

        // 发送注册请求，包括邀请码
        axios
            .post('http://10.112.244.193:8002/register/admininfo', registrationData)
            .then(() => {
              console.log('注册成功');
              // 可以在这里处理注册成功后的逻辑，如跳转到登录页面等
            })
            .catch((error) => {
              console.error('注册失败:', error);
              // 可以在这里处理注册失败后的逻辑，如显示错误信息等
            });
      } else {
        console.log('请填写完整的注册信息');
      }
    },
    async updateCities() {
      try {
        const response = await axios.get('http://10.112.244.193:8001/search_sub', {
          params: {
            name: this.selectedProvince,
            type: 1  // 1 表示省份
          }
        });

        if (response.status === 200) {
          this.cities = response.data.list;
          this.selectedCity = ''; // 重置选中的城市
          this.districts = [];   // 清空区域列表
          this.form.address = ''; // 重置选中的区域
        } else {
          // 处理请求失败的情况
          console.error('获取城市列表失败');
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    },

    async updateDistricts() {
      try {
        const response = await axios.get('http://10.112.244.193:8001/search_sub', {
          params: {
            name: this.selectedCity,
            type: 2  // 2 表示城市
          }
        });

        if (response.status === 200) {
          this.districts = response.data.list;
          this.form.address = ''; // 重置选中的区域
        } else {
          // 处理请求失败的情况
          console.error('获取区域列表失败');
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    },  
    }
  };

</script>

<style scoped>
body,html {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;

}

.page-content {
  /* 设置页面内容容器的高度，留出顶栏和底栏的空间 */
  margin-top: 60px; /* 顶栏的高度 */
  margin-bottom: 40px; /* 底栏的高度 */
  /* 根据需要添加其他样式，比如背景色或滚动条等 */
}

#login-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px; /* 确保.box也有最大宽度限制 */
  width: 100%; /* 确保.box占据全部可用宽度 */

}


.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 60%; /* 将最大宽度设置为60% */
  width: 100%; /* 确保.form占据全部可用宽度 */
  padding: 40px;
  border-radius: 20px;
  position: relative;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
  font-size: 18px;

}




.form .input-row {
  position: relative;
  display: flex;
  flex-direction: column; /* 如果你希望每个标签和选择框单独一行 */
  align-items: flex-start; /* 对齐到容器的开始位置 */
  gap: 15px; /* 行与行之间的间隔 */
}

.form .input-row .input,
.form .input-row .select {
  background-color: #333;
  color: #fff;
  width: 90%;
  padding: 25px 20px; /* Updated padding */
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: 1.0em; /* Updated font size */
}

.form .input-row .input + span,
.form .input-row .select + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 20px; /* Updated left position */
  top: 20px; /* Updated top position */
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form .input-row .input:placeholder-shown + span,
.form .input-row .select:placeholder-shown + span {
  top: 30px; /* Updated top position */
  font-size: 0.9em;
}

.form .input-row .input:focus + span,
.form .input-row .input:valid + span,
.form .input-row .select:focus + span,
.form .input-row .select:valid + span {
  color: #84fab0 ;
  top: 5px; /* Updated top position */
  font-size: 0.8em;
  font-weight: 600;
}

textarea.form-input {
  height: 70px;
}

.name {
  color: #C0C0C0;
}

.submit {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 30px;
  color: #1a1a1a;
  font-size: 26px;
  font-weight: bold; /* Makes the text bold */

  transform: .3s ease;
  background-image: linear-gradient(120deg, #84fab0  0%, #8fd3f4 100%);
  
  margin-bottom: 100px;
  margin-top: 20px;
  width: 400px; /* 确保.form占据全部可用宽度 */
}

.submit:hover {
  background-image: linear-gradient(to right, #19e83f, #0eb4dd);
}


.input {
  font-size: medium;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}




</style>
