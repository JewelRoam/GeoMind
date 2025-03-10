<template>
  <div class="confirmation-box">
    <h1>国脉山河帐号绑定新邮箱确认</h1>
    <p>尊敬的 <span id="user_info.name">{{ userName }}</span>用户您好，</p>
    <p>你正在进行国脉山河地图标准平台帐号邮箱绑定操作，如非本人操作，请忽略或修改密码。</p>
    <p>国脉山河帐号: <span id="user_info.id">{{ userId }}</span></p>
    <p>即将绑定邮箱地址: <span id="user_info.newmail">{{ newMail }}</span></p>
    <p>
      <button id="confirmButton">确认绑定</button>
      <button id="modifyPasswordButton">非本人操作，立即修改密码</button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    userName: String, // 用户名
    userId: String,   // 用户账号
    newMail: String   // 对应的邮箱号码
  }
};
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-image: url("../../assets/imgs/地图.png"); /* 背景图片路径 */
            background-size: cover; /* 使背景图片铺满整个页面 */
            background-repeat: no-repeat; /* 防止背景图片重复 */
            background-attachment: fixed; /* 使背景图片固定不滚动 */
}

.confirmation-box {
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
}

p {
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>