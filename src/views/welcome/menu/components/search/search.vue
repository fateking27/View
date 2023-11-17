<template>
  <div class="search-bg" v-if="showBlock">
    <el-select
      v-model="searchValue"
      filterable
      placeholder="请输入关键字"
      class="w-full"
      @change="changeSearch"
    >
      <el-option
        v-for="(item, index) of searchOptions"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const showBlock = ref(false);
const searchValue = ref();
const searchOptions = ref([]);
let searchIndex;
let searchEntities;

const changeSearch = val => {
  for (const entity of searchEntities) {
    if (
      entity?.label?.text?.getValue()?.indexOf(removeTrailingNumber(val)) > -1
    ) {
      emit("searchDetail", entity);
      const lon =
        entity.properties?.lon?.getValue() ||
        entity.properties?.centerLng?.getValue();
      const lat =
        entity.properties?.lat?.getValue() ||
        entity.properties?.centerLat?.getValue();
      const height = searchIndex === "bearingBody" ? 1000 : 5000000;
      window.viewer.camera.flyTo({
        duration: 1.8,
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height), //设置位置
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: Cesium.Math.toRadians(0.0)
        }
      });
      break;
    }
  }
};

const removeTrailingNumber = str => {
  const regex = /\d$/; // 匹配最后一个字符是否为数字
  if (regex.test(str)) {
    return str.slice(0, -1); // 去掉最后一个字符
  } else {
    return str;
  }
};
const setData = index => {
  searchValue.value = "";
  searchIndex = index;
  const arr = [];
  if (searchIndex === "bearingBody") {
    searchEntities = window.viewer.entities.values;
    for (const entity of searchEntities) {
      if (entity?.name?.indexOf("bearingBody") > -1) {
        arr.push({
          value: entity?.label?.text?.getValue(),
          label: entity?.label?.text?.getValue()
        });
      }
    }
  } else if (searchIndex === "fishery") {
    const dataSource = window.viewer.dataSources.getByName("fishery")[0];
    searchEntities = dataSource.entities.values;
    for (const entity of searchEntities) {
      let name;
      const lastTwoChars = entity.id.slice(-2);
      if (lastTwoChars.indexOf("_") > -1) {
        name =
          entity.properties?.name?.getValue() +
          entity.id.charAt(entity.id.length - 1);
      } else {
        name = entity.properties?.name?.getValue();
      }
      arr.push({
        value: name,
        label: name
      });
    }
  }
  searchOptions.value = arr;
};

const emit = defineEmits<{
  (e: "searchDetail", properties: ""): void;
}>();
defineExpose({ showBlock, setData });
</script>

<style lang="scss" scoped>
.search-bg {
  position: fixed;
  top: 90px;
  left: 320px;
  z-index: 1;
  width: 280px;
  padding: 10px;
  background: linear-gradient(
    180deg,
    rgb(13 54 110 / 65%) 0%,
    rgb(13 54 110 / 95%) 100%
  );
}
</style>
