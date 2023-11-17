<template>
  <div class="splitView-bg" v-if="showBlock">
    <div class="v-block left">
      <div class="b-title">专题数据</div>
      <el-select v-model="leftValue" filterable class="w-full">
        <el-option
          v-for="(item, index) of leftOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="v-block right">
      <div class="b-title">专题数据</div>
      <el-select v-model="rightValue" filterable class="w-full">
        <el-option
          v-for="(item, index) of rightOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const showBlock = ref(false);
const leftValue = ref("影像数据");
const rightValue = ref("矢量数据");
const leftOptions = [
  {
    label: "影像数据",
    value: "影像数据"
  }
];
const rightOptions = [
  {
    label: "矢量数据",
    value: "矢量数据"
  }
];

defineExpose({ showBlock });
</script>

<style lang="scss" scoped>
.splitView-bg {
  .v-block {
    position: fixed;
    top: 80px;
    width: 140px;
    padding: 10px;
    background: linear-gradient(
      180deg,
      rgb(13 54 110 / 65%) 0%,
      rgb(13 54 110 / 95%) 100%
    );

    .b-title {
      margin-bottom: 5px;
      font-size: 14px;
    }

    &.left {
      left: 50%;
      margin-left: -150px;
    }

    &.right {
      right: 50%;
      margin-right: -155px;
    }
  }
}
</style>
