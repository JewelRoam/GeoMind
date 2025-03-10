<template>
  <img class="BackgroundImage" />
  <div>
    <div class="container">
      <div class="box">
        <div class="sidebar">
          <ul>
            <li :class="{ active : content==='details' }" id="details"  @click="changeContent('details')">积分明细</li>
            <li :class="{ active : content==='cash' }" id="cash" @click="changeContent('cash')">积分兑现</li>
            <li :class="{ active : content==='statics' }" id="statics" @click="changeContent('statics')">统计总览</li>
          </ul>
        </div>
        <Details v-if="content==='details'"></Details>
        <Cash v-else-if="content==='cash' || content===''"></Cash>
        <Statistics v-else-if="content==='statics'"></Statistics>
      </div>
    </div>
  </div>
</template>

<script>
import Details from './contents/Details.vue'
import Cash from './contents/Cash.vue'
import Statistics from './contents/Statistics.vue'

export default{
  components: {
    Details,
    Cash,
    Statistics
  },
  data() {
    return {
      content: 'details',
    };
  },
  methods: {
    changeContent(index) {
      this.content = index;
    }
  },
  mounted() {

  }
}
</script>


<style scoped>
.BackgroundImage {
  top: 60px;
  left:0;
  right: 0;
  width: 100%; 
  height: 100%; 
  /* padding-bottom: calc(1034 / 1707 * 100%);  */
  background-image: url('@/assets/images/标注员/background-image.png');
  background-size: cover; 
  background-position: center; 
  position: fixed;
  opacity: 0.50; }
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url("../../assets/imgs/地图.png"); /* 背景图片路径 */
  background-size: cover; /* 使背景图片铺满整个页面 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 使背景图片固定不滚动 */
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
.sidebar {
  width: 20%;
  padding: 15px;
  box-sizing: border-box;
  height: calc(100% - 100px);
  margin-top: 80px;
}

.sidebar ul {
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin: 10px 0;
  padding: 15px;
  text-align: center;
  color: white;
  font-size: 18px;
  position: relative;
  cursor: pointer;
}

.sidebar ul li.active {
  background-color: #4C4444;
}

.sidebar ul li:not(.active) {
  background-color: #998888;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}
</style>
