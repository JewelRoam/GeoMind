<template>
  <LoginBox :userType="'user'" :loginUrl="'http://10.112.244.193:8002/log/User'" />
</template>

<script>
import axios from 'axios';
import LoginBox from '@/views/manage/log_box.vue';
import UserTabContainer from '@/views/manage/LoginContainer/UserTabContainer.vue';


export default {
  components: {
    LoginBox,
    UserTabContainer,
},
  data() {
    return {
      accountOrPhone: '',
      password: '',
    
    };
  },
  
  
};
</script>


<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

#login-container {
  width: 100%;
  height: 100%;
  /* Add your background pattern here */
  background-color: #ffffff;
  background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
}

.tab-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  padding: 2px;
  background-color: #ebebec;
  border-radius: 9px;
  margin: 10px 20px 0px 20px;
  width: 300px;
}

.indicator {
  content: "";
  width: 50%;
  height: 28px;
  background: #FFFFFF;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 9;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  transition: all 0.2s ease-out;
}

.tab {
  width: 50%;
  height: 28px;
  position: relative;
  z-index: 99;
  background-color: transparent;
  border: 0;
  outline: none;
  flex: none;
  align-self: stretch;
  flex-grow: 1;
  cursor: pointer;
  font-weight: 500;
}

.tab--1:hover ~ .indicator {
  left: 2px;
}

.tab--2:hover ~ .indicator {
  left: calc(50% - 2px);
}

#login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 垂直居中元素 */
  align-items: center;
  justify-content: center; /* 新增这行 */
  background-color: rgba(255, 255, 255, 0.9); /* 添加白色的背景，稍微透明以让背景图片稍微可见 */
  backdrop-filter: blur(5px); /* 可以添加此属性使背景稍微模糊，增强可读性 */
}

#login-header {
  margin-bottom: 20px;
}

#login-header button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 14px;
}

.user-button {
  font-weight: bold; /* 用户按钮加粗 */
}

#login-box {
  /* width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  text-align: center; */
  width: 300px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 2px;
  padding: 30px;
}


#login-box .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

#login-box .input-wrapper input{
  /* width: 100%;
  margin-bottom: 10px;
  padding: 5px; */
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}


#login-box .input-wrapper input::placeholder {
  text-transform: uppercase;
}

#login-box .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #19e83f, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
#login-box .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}
 
#login-box .action {
  display: flex;
  justify-content: center;
}
 
#login-box .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
}
 
#login-box .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0  0%, #8fd3f4 100%);
}
 
#login-box .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}
 
#login-box .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}
 
#login-box .icon-wrapper i:hover {
  background-color: #0e92b3;
}
</style>