<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/new' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/contactUs' }"
            >网站地图</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 600px">
          <el-container class="justify-center mx-32">
            <div>
              <div style="width: 1100px; font-size: 23px">
                <h1 style="margin-bottom: 20px; margin-left: 50%">网站地图</h1>
                <div class="sitemap" style="width: 100%; margin-left: 15%">
                  <div class="new">
                    <h4>&nbsp; 新闻信息：</h4>
                    <div>
                      &nbsp; &nbsp; &nbsp;
                      <router-link to="/dynamic">工作动态</router-link>
                      &nbsp; &nbsp;
                      <router-link to="/progress">进展成效</router-link>
                      &nbsp; &nbsp;
                    </div>
                  </div>
                  <div class="introduce">
                    <h4>&nbsp; 门户及项目介绍：</h4>
                    <div>
                      &nbsp; &nbsp; &nbsp;
                      <router-link to="/detail/1">项目来源</router-link>
                      &nbsp; &nbsp;
                      <router-link to="/meaning/1">建设意义</router-link>&nbsp;
                      &nbsp; &nbsp;
                      <router-link to="/expectation/1">预期成果</router-link
                      >&nbsp; &nbsp;
                    </div>
                  </div>
                  <div class="results">
                    <h4>&nbsp; 成果内容展示：</h4>
                    <div>
                      &nbsp; &nbsp; &nbsp;
                      <router-link to="/fix/1 ">修复进度</router-link>&nbsp;
                      &nbsp;
                      <router-link to="/results?res">当前成果</router-link
                      >&nbsp; &nbsp;
                      <router-link to="/results?stage">阶段展示</router-link
                      >&nbsp; &nbsp;
                    </div>
                  </div>
                  <div class="service">
                    <h4>&nbsp; 对外服务：</h4>
                    <div>
                      &nbsp; &nbsp; &nbsp;
                      <router-link to="/mapService"> 地图服务 </router-link>
                      &nbsp; &nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// import { reactive } from "vue";

// function handleClick(item) {
//   router.push({ name: "Detail", params: { id: item.id } });
// }

defineOptions({
  name: "siteMap"
});

// const newsData = reactive({
//   data: []
// });

// const newSize = reactive({
//   data: [],
//   fontSize: "16px" // 默认字体大小
// });

// const handleClickLarge = () => {
//   newSize.fontSize = "24px";
// };

// const handleClickMedium = () => {
//   newSize.fontSize = "16px";
// };

// const handleClickSmall = () => {
//   newSize.fontSize = "12px";
// };
</script>

<style scoped>
.mb-10 tr .border:first-child {
  padding: 10px;
  text-align: right;
}

.mb-10 tr .border:last-child {
  /* height: 40px; */
  padding: 10px;
}

.sitemap h4,
.new div,
.introduce div,
.results div,
.service div {
  padding-top: 20px;
}

.el-main::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
</style>
