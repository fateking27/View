<template>
  <div class="header-bg-long" />
  <div class="header-bg">
    <div class="h-in-bg">
      <div class="h-date">{{ nowDate }}</div>
      <div class="h-title">{{ title }}</div>
      <div class="h-info">
        <div class="h-block">
          <i class="iconfont icon-shujucaozuoyuan" />{{ username }}
        </div>
        <div class="h-block cursor-pointer" @click="logout">
          <i class="iconfont icon-a-tuichu1" />退出
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNav } from "@/layout/hooks/useNav";
import { getCurrentDate } from "@pureadmin/utils";
import { onBeforeUnmount, ref } from "vue";

const timer = ref();
const nowDate = ref();

timer.value = setInterval(() => {
  nowDate.value = `${getCurrentDate().ymd} ${getCurrentDate().week} ${
    getCurrentDate().hms
  }`;
}, 1000);

onBeforeUnmount(() => {
  timer.value = null;
});

const { title, username, logout } = useNav();
</script>

<style lang="scss" scoped>
.header-bg-long {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 14px;
  background: url("@/assets/layout/header-bg-long.png") top repeat-x;
  background-size: auto 100%;
}

.header-bg {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  min-width: 1350px;
  height: 100px;
  background: url("@/assets/layout/header-bg.png") no-repeat center;

  .h-in-bg {
    position: relative;
    max-width: 1780px;
    padding: 0 10px;
    margin: 0 auto;

    .h-date {
      position: absolute;
      top: 18px;
      left: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }

    .h-title {
      width: fit-content;
      margin: 0 auto;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-size: 34px;
      font-weight: 400;
      line-height: 70px;
      text-align: center;
      letter-spacing: 1px;
      background: linear-gradient(180deg, #fff 37%, #b4cff2 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .h-info {
      position: absolute;
      top: 19px;
      right: 10px;
      display: flex;
      align-items: center;

      .h-block {
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #fff;

        .iconfont {
          margin-right: 5px;
          font-size: 13px;
          color: #8cb8ef;
        }
      }
    }
  }
}
</style>
