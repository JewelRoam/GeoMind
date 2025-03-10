<template>
  <!-- <WelcomeHead></WelcomeHead> -->
  <div class="welcome-page fixed-welcome-page">
    <h1 class="title">欢迎使用国脉山河平台</h1>
    <div class="options">
  <div class="option register-option">
    <div class="circle register-circle">
      <router-link to="/Register/Choose" class="router-link">
        <span class="option-text">注册</span>
      </router-link>
    </div>
  </div>
  <div class="option login-option">
    <div class="circle login-circle">
      <router-link to="/Log/Choose" class="router-link">
        <span class="option-text">登录</span>
      </router-link>
    </div>
  </div>
</div>

  </div>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
</template>

<style scoped>
.page-content {
  /* 设置页面内容容器的高度，留出顶栏和底栏的空间 */
  margin-top: 60px; /* 顶栏的高度 */
  margin-bottom: 40px; /* 底栏的高度 */
  /* 根据需要添加其他样式，比如背景色或滚动条等 */
}
.fixed-welcome-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.title {
  font-size: 80px; /* 初始很大的尺寸 */
  margin-bottom: 20px;
  color: #333;
  opacity: 0;
  animation: fadeInTitle 2s ease-out forwards, fadeInButtons 1s ease-in-out 2s forwards;
  text-shadow: 2px 2px 8px rgba(24, 121, 7, 0.6);
}

@keyframes fadeInTitle {
  from {
    opacity: 0;
    transform: scale(2); /* 从大到原始尺寸 */
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 去掉router-link元素的下划线 */
.router-link-exact-active, .router-link-active {
  text-decoration: none !important;
}

.options {
  display: flex;
  justify-content: space-between;
  width: 300px;
  opacity: 0;
  animation: fadeInButtons 1s ease-in-out 2s forwards;
}

@keyframes fadeInButtons {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.option {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.register-circle {
  background-color: #4CAF50; /* 注册按钮原始背景颜色 */
}

.register-circle:hover {
  background-color: #388E3C; /* 注册按钮鼠标悬停时的背景颜色 */
}

.login-circle {
  background-color: #81C784; /* 登录按钮原始背景颜色 */
}

.login-circle:hover {
  background-color: #66BB6A; /* 登录按钮鼠标悬停时的背景颜色 */
}

.option-text {
  font-size: 24px;
  color: #fff; 
  text-decoration: none !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
