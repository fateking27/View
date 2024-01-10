<template>
  <el-header class="header">
    <div class="logo">珠海市海洋生态修复保护项目安全保障及自动监管工程</div>
    <el-menu
      class="menu"
      mode="horizontal"
      router="true"
      :default-active="activeIndex"
    >
      <el-menu-item index="/new">新闻信息</el-menu-item>
      <el-menu-item index="/introduce">门户及项目介绍</el-menu-item>
      <el-menu-item index="/results">成果内容展示</el-menu-item>
      <el-menu-item index="/service">对外服务</el-menu-item>
    </el-menu>
    <el-input
      class="search"
      placeholder="请输入要搜索的内容"
      v-model="keyWord.key"
    />
    <el-button @click="handleClick(keyWord)"> 搜索 </el-button>
    <!--    <el-button class="login-register" type="primary" round plain @click="login"-->
    <!--      >登录 / 注册</el-button-->
    <!--    >-->
  </el-header>
  <el-container>
    <div class="image-container">
      <div class="line">——</div>
      <div class="title">珠海市海洋生态修复保护项目安全保障及自动监管工程</div>
    </div>
    <!--    <div class="image-container" />-->
  </el-container>
</template>

2024-01-10 17:22:24

<script lang="ts" setup>
import { ref, watch, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { ElHeader, ElMenu, ElMenuItem, ElInput } from "element-plus";
import router from "@/router";

const route = useRoute();
const active = ref(route.path);

watch(
  () => route.path,
  value => {
    active.value = value;
  }
);

const activeIndex = computed(() => {
  const { name } = route;
  switch (name) {
    case "New":
    case "Information":
    case "Dynamic":
    case "Progress":
      return "/new";
    case "Introduce":
    case "Detail":
      // case "Meaning":
      // case "Expectation":
      return "/introduce";
    case "Results":
    case "Fix":
    case "Current":
    case "Page":
      return "/results";
    default:
      return "/service";
  }
});

watch(activeIndex, value => {
  active.value = value;
});

const keyWord = reactive({
  key: undefined
});

function handleClick(keyWord) {
  router.push({ name: "Search", params: { keyWord: keyWord.key } });
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
}

.logo {
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  color: #5587eb;
}

.menu {
  flex: 1.2;
}

.el-menu-item {
  font-weight: normal;
}

.is-active {
  font-weight: bold;
}

.search {
  width: 150px;
  margin-right: 10px;
}

.image-container {
  width: 100%;
  height: 340px;
  background-image: url("@/assets/layout/header-bg.png");
  background-position: center;
  background-size: cover;
}

.title {
  width: 600px;
  height: 150px;
  margin-top: 40px;
  margin-left: 200px;
  font-size: 40px;
  line-height: 1.7;
  color: white;
}

.line {
  height: 70px;
  margin-left: 200px;
  font-size: 100px;
  color: white;
}
</style>
