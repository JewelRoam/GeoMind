<template>
    <div class="main-content">
      <div class="sub-box" v-for="section in sections" :key="section.title">
        <h3>{{ section.title }}</h3>
        <div class="sub-box-content">
          <div v-for="(field, index) in section.fields" :key="index" class="editable-field">
            <span>{{ field.label }}：</span>
            <template v-if="field.type === 'text'">
              <input type="text" :id="field.id" v-model="field.value">
            </template>
            <template v-else-if="field.type === 'email'">
              <input type="email" :id="field.id" v-model="field.value">
            </template>
            <button @click="field.action">{{ field.buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sections: Array,
    },
  };
  </script>
  
  <style scoped >


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
  