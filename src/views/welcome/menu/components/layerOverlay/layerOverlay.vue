<template>
  <div class="layerOverlay-bg" v-if="showBlock">
    <div class="o-block" ref="windRef">
      <IconifyIconOffline
        :icon="alignVertically"
        width="19"
        @click="swapDivs"
        class="cursor-pointer"
      />
      <el-checkbox
        v-model="windShow"
        :disabled="currentIndex === 'windPoint'"
        label="风场"
        class="b-checkbox"
        @change="windShowChange"
      />
    </div>
    <div class="o-block" ref="seaRef">
      <IconifyIconOffline
        :icon="alignVertically"
        width="19"
        @click="swapDivs"
        class="cursor-pointer"
      />
      <el-checkbox
        v-model="seaAreaShow"
        :disabled="currentIndex === 'seaArea'"
        label="温度场"
        class="b-checkbox"
        @change="seaAreaShowChange"
      />
      <el-slider
        v-model="sliderValue"
        @change="changeSeaArea"
        :disabled="!seaAreaShow"
        class="b-slider"
      />
    </div>
    <WindPoint ref="windPointRef" />
    <SeaArea ref="seaAreaRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import alignVertically from "@iconify-icons/ri/align-vertically";
import WindPoint from "@/views/welcome/menu/windPoint/windPoint.vue";
import SeaArea from "@/views/welcome/menu/seaArea/seaArea.vue";

const showBlock = ref(false);
const windPointRef = ref(null);
const seaAreaRef = ref(null);
const windShow = ref(false);
const seaAreaShow = ref(false);
const sliderValue = ref(0);
const currentIndex = ref(null);

const windRef = ref(null);
const seaRef = ref(null);

let blockIndex = 1;

const reset = () => {
  windShow.value = false;
  seaAreaShow.value = false;
  sliderValue.value = 0;
  blockIndex = 1;
  seaAreaSource = null;
  windAreaSource = null;
  currentIndex.value = null;
};
const swapDivs = () => {
  if (!seaAreaSource) {
    return;
  }
  const parent = windRef.value.parentNode;
  const nextSibling = seaRef.value.nextSibling;
  parent.insertBefore(windRef.value, seaRef.value);
  parent.insertBefore(windRef.value, nextSibling);
  if (blockIndex === 1) {
    blockIndex = 2;
    for (const entity of seaAreaSource.entities.values) {
      entity.polygon.height = 10000;
    }
  } else {
    blockIndex = 1;
    for (const entity of seaAreaSource.entities.values) {
      entity.polygon.height = 9;
    }
  }
};

let seaAreaSource;
const seaAreaShowChange = val => {
  if (val) {
    if (!seaAreaSource) {
      // drawSeaAreaLandParcel();
      seaAreaRef.value.getData("fromLayerOverlay");
      setTimeout(() => {
        seaAreaSource = window.viewer.dataSources.getByName("seaArea")[0];
        sliderValue.value = 65;
      }, 500);
    } else {
      for (const entity of seaAreaSource.entities.values) {
        entity.polygon.show = true;
      }
    }
  } else {
    if (seaAreaSource) {
      for (const entity of seaAreaSource.entities.values) {
        entity.polygon.show = false;
      }
    }
  }
};

const changeSeaArea = val => {
  for (const entity of seaAreaSource.entities.values) {
    entity.polygon.material = Cesium.Color.fromCssColorString(
      entity.properties?.tempColor
    ).withAlpha(val / 100);
  }
};

let windAreaSource;
const windShowChange = val => {
  if (val) {
    windPointRef.value.showDrawer = true;
    if (!windAreaSource) {
      windPointRef.value.setData("fromLayerOverlay");
      setTimeout(() => {
        windAreaSource = window.viewer.dataSources.getByName("windArea")[0];
      }, 500);
    } else {
      for (const entity of windAreaSource.entities.values) {
        entity.polygon.show = true;
      }
      for (const entity of window.viewer.entities.values) {
        if (entity?.id?.indexOf("windPointId") > -1) {
          entity.show = true;
        }
      }
    }
  } else {
    if (windAreaSource) {
      windPointRef.value.showDrawer = false;
      for (const entity of windAreaSource.entities.values) {
        entity.polygon.show = false;
      }
      for (const entity of window.viewer.entities.values) {
        if (entity?.id?.indexOf("windPointId") > -1) {
          entity.show = false;
        }
      }
    }
  }
};

const setData = index => {
  reset();
  currentIndex.value = index;
  if (currentIndex.value === "windPoint") {
    windShow.value = true;
  } else if (currentIndex.value === "seaArea") {
    setTimeout(() => {
      seaAreaSource = window.viewer.dataSources.getByName("seaArea")[0];
      sliderValue.value = 65;
    }, 300);
    seaAreaShow.value = true;
  }
};

defineExpose({ showBlock, setData });
</script>

<style lang="scss" scoped>
.layerOverlay-bg {
  position: fixed;
  bottom: 20px;
  left: 320px;
  width: 300px;
  padding: 10px;
  background: linear-gradient(
    180deg,
    rgb(13 54 110 / 65%) 0%,
    rgb(13 54 110 / 95%) 100%
  );

  .o-block {
    display: flex;
    align-items: center;

    .b-checkbox {
      margin: 0 10px;
    }

    .b-slider {
      width: 170px;
      margin: 0 10px;
    }
  }
}
</style>
