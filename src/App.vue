<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { ElConfigProvider } from "element-plus";
// import zhCN from "element-plus/dist/locale/zh-cn.mjs";
// import { ReDialog } from "@/components/ReDialog";
export default defineComponent({
  name: "app"
  // components: {
  //  /* [ElConfigProvider.name]: ElConfigProvider,
  //   ReDialog*/
  //
  // },
  // computed: {
  //   // currentLocale() {
  //   //   return zhCN;
  //   // }
  // }
});
</script>

<style>
body::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
</style>
