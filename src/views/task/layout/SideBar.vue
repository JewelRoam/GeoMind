<template>
    <div class="Sidebar">
        <div class="box1">
        <div class="Block TrashbinList">
            <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/trashbin-logo.png" alt="Trash bin logo" />
            <div class="Link">已完成</div>
            </div>
        </div>
        <div class="Block RecentList">
            <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/recent-logo.png" alt="Recent logo">
            <div class="Link">最近</div>
            </div>
            <!-- <ul class="LinkSecond">
            <li>最近上传</li>
            <li>最近打开</li>
            <li>最近删除</li>
            </ul> -->
        </div>
        <div class="Block MytaskList">
            <div class="LogoLinkGroup">
            <img class="Logo" src="@/assets/images/标注员/mytask-logo.png" alt="My task logo" />
            <div class="Link">我的任务</div>
            </div>
            <div class="app">
            <ul class="LinkSecond">
                <li v-for="task in tasks" :key="task.task_id">{{ task.task_name }}</li>
            </ul>
            </div>
        </div>
        </div>
    
        </div>
</template>
<script>
export default{
    name: 'SideBar',
    props:["tasks"],
    data (){
        return{

        }
    }
}
</script>
<style scoped>
.Sidebar { position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 82.5%;
    background: black;
    opacity: 0.60;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px; }
.LogoLinkGroup { display: flex;
    align-items: center;
    gap: 10px; }
.Logo { width: 12px;
    height: 12px;
    flex-shrink: 0;
    fill: #BEBEBE; }
.Link { color: #FFF;
    font-size: 16px;
    font-family: Noto Sans SC;
    font-weight: 700;
    line-height: 22px;
    text-align: center; }
.LinkSecond { color: #FFF;
    font-family: Noto Sans SC;
    font-size: 13px;
    font-weight: 350;
    line-height: 22px;
    margin-top: 6px;
    text-align: center;
    white-space: nowrap; /* 防止文本换行 */ }
.Block { display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px; }
.RecentList ul,
  .MytaskList ul { 
    width: auto;
    padding: 0;
    margin: 0;
    margin-left: 25%;
    margin-top: 6px;
    text-align: center; }
.box1 { z-index: 2; }
</style>
