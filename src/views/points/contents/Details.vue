<template>
<div class="main-content">
  <div class="sub-box">
      <h3>现有积分：{{ sum }}</h3>
      <div class="sub-box-content">
          <div v-if="loading">正在加载数据...</div>
              <div v-else>
              <ul>
                  <li v-for="change in changes" :key="change.change_id">
                  变动类型: {{ change.change_type }}, 变动量: {{ change.amount }}, 时间: {{ change.time }}
                  </li>
              </ul>
          </div>
      </div>
  </div>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const loading = ref(true);
const sum = ref(0);
const changes = ref([]);

const fetchData = async (userId) => {
  try {
    const response = await fetch(`http://10.112.244.193:8001/points/details?user_id=${userId}`);
    const data = await response.json();
    if (data.status === 200) {
      sum.value = data.sum;
      changes.value = data.changes;
      loading.value = false;
    } else {
      console.error('获取积分数据失败');
      loading.value = false;
    }
  } catch (error) {
    console.error('获取积分数据失败:', error);
    loading.value = false;
  }
};

const generateMockData = () => { //仅供测试
  const mockChanges = [];
  for (let i = 1; i <= 10; i++) {
    mockChanges.push({
      change_id: `change_id_${i}`,
      change_user_id: i,
      change_type: `Change Type ${i}`,
      amount: Math.floor(Math.random() * 100) + 1, // Random amount between 1 and 100
      time: new Date().toISOString(),
      organization: `Organization ${i}`,
      change_information: `Change Information ${i}`
    });
  }
  return mockChanges;
};

onMounted(() => {
  const userId = sessionStorage.getItem('user_info.id');
  fetchData(userId);

  const mockChanges = generateMockData();
  sum.value = mockChanges.reduce((total, change) => total + change.amount, 0);
  changes.value = mockChanges;
});

const data = () => ({
  loading,
  sum,
  changes,
});
</script>
<style scoped>
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
</style>
