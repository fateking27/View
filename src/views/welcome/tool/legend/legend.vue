<template>
  <div class="legend-bg" v-if="legendData?.length > 0">
    <div class="l-list">
      <div class="l-block" v-for="(item, index) of legendData" :key="index">
        <img class="b-img" :src="item.img" alt="" v-if="item.img" />
        <div
          class="b-color"
          :style="{ background: item.color }"
          v-if="item.color"
        />
        <div class="b-text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useLegendStoreHook } from "@/store/modules/legend";

const legendData = computed(() => useLegendStoreHook().$state.legendData);
</script>

<style lang="scss" scoped>
.legend-bg {
  padding-top: 12px;

  .l-list {
    display: flex;
    flex-wrap: wrap;

    .l-block {
      display: flex;
      align-items: center;
      width: 50%;
      margin-bottom: 12px;

      .b-img {
        width: 20px;
        margin: 0 10px 0 5px;
      }

      .b-color {
        width: 10px;
        height: 10px;
        margin: 0 10px 0 5px;
        border-radius: 50%;
      }

      .b-text {
        font-size: 13px;
        color: #fff;
      }
    }
  }
}
</style>
