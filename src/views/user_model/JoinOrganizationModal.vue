<template>
  <div>
    <!-- 在我的组织页面中的按钮，点击后触发打开弹窗的事件 -->
    <button @click="openModal">加入更多组织</button>

    <!-- 弹窗模态框 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">×</span>
        <h2>加入更多组织</h2>

        <!-- 搜索输入框 -->
        <input type="text" v-model="searchQuery" placeholder="搜索组织名称或ID" />

        <!-- 搜索按钮 -->
        <button @click="searchOrganizations">搜索</button>

        <!-- 显示搜索结果 -->
        <ul>
          <li v-for="org in searchResults" :key="org.id">
            {{ org.name }} (ID: {{ org.id }})
            <button @click="applyToOrganization(org)">申请加入</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      searchQuery: "",
      searchResults: [],
      // 模拟一些组织数据，用于展示搜索结果
      organizations: [
        { id: 1, name: "组织1" },
        { id: 2, name: "组织2" },
        { id: 3, name: "组织3" },
      ],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.searchQuery = "";
      this.searchResults = [];
    },
    searchOrganizations() {
      // 根据搜索查询过滤组织数据
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.organizations.filter((org) => {
        return org.name.toLowerCase().includes(query) || org.id.toString().includes(query);
      });
    },
    applyToOrganization(org) {
      // 在这里可以执行向组织发送申请的逻辑
      alert(`申请加入组织：${org.name} (ID: ${org.id})`);
    },
  },
};
</script>

<style scoped>
/* 样式可根据需要自行美化 */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
