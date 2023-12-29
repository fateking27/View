<template>
  <div class="app-wrapper">
    <Header />
    <Appmain />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import "animate.css";
// 引入 src/components/ReIcon/src/offlineIcon.ts 文件中所有使用addIcon添加过的本地图标
import "@/components/ReIcon/src/offlineIcon";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Appmain from "./components/appMain.vue";
</script>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    display: table;
    clear: both;
    content: "";
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.app-mask {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.re-screen {
  margin-top: 12px;
}
</style>
