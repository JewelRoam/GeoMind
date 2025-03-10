<template>
    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">© 2023 GMSH. All Rights Reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
/* 底部区域样式 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  color: white;
  text-align: center;
  padding: 8px 0;
  height: 40px; /* 设置高度 */
}

/* 版权信息样式 */
.copyright {
  font-size: 14px;
}
</style>
  