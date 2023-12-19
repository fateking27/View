<template>
  <el-header class="header">
    <div class="logo">工程项目数据与可视化</div>
    <el-menu class="menu" mode="horizontal" router="true" default-active="/new">
      <el-menu-item index="/new" :class="{ 'is-active': activeMenu === '1' }"
        >新闻信息</el-menu-item
      >
      <el-menu-item
        index="/introduce"
        :class="{ 'is-active': activeMenu === '2' }"
        >门户及项目介绍</el-menu-item
      >
      <el-menu-item
        index="/results"
        :class="{ 'is-active': activeMenu === '3' }"
        >成果内容展示</el-menu-item
      >
      <el-menu-item
        index="/service"
        :class="{ 'is-active': activeMenu === '4' }"
        >对外服务</el-menu-item
      >
    </el-menu>
    <el-input class="search" placeholder="请输入要搜索的内容" />
    <el-button class="login-register" type="primary" round plain @click="login"
      >登录 / 注册</el-button
    >
  </el-header>
  <el-container>
    <div class="image-container" />
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElHeader, ElMenu, ElMenuItem, ElInput, ElButton } from "element-plus";

export default defineComponent({
  components: {
    ElHeader,
    ElMenu,
    ElMenuItem,
    ElInput,
    ElButton
  },
  methods: {
    login() {
      this.$router.push("/login");
    }
  }
});
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

.login-register {
  margin-left: 10px;
  color: #5587eb;
  background-color: #f5f6f9;
}

.image-container {
  width: 100%;
  height: 540px;
  background-image: url("@/assets/layout/header-bg.png");
  background-position: center;
  background-size: cover;
}
</style>
