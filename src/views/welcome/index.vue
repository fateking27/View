<template>
  <div class="home-bg">
    <div
      id="splitViewSlider"
      v-show="sliderVisibility"
      class="splitView-slider"
    />
    <div id="infobox" class="infobox" />
    <!--    <canvas id="windRef" class="wind" />-->
    <vc-viewer v-bind="viewerOption" @ready="onViewerReady">
      <vc-layer-imagery :imagery-provider="tdImg" />
      <vc-layer-imagery :imagery-provider="tdVec" />
      <vc-layer-imagery :imagery-provider="tdIbo" />
      <vc-layer-imagery :imagery-provider="tdCia" />

      <div v-show="false">
        <vc-measurements ref="measurementsRef" :measurements="['area']" />
        <vc-drawings
          ref="drawingsRef"
          :drawings="['polyline']"
          @drawEvt="drawEvt"
        />
      </div>
    </vc-viewer>

    <Menu :showChild="showChild" />
    <Tool
      :showChild="showChild"
      :linePositions="linePositions"
      @drawLine="drawLine"
      @getArea="getArea"
      @clear="clear"
      @showSliderVisibility="showSliderVisibility"
    />
  </div>
</template>
<script setup lang="ts">
// import { storageLocal } from "@pureadmin/utils";
// import { router } from "@/router";
import Menu from "./menu/menu.vue";
import Tool from "./tool/tool.vue";
import { VcReadyObject } from "vue-cesium/es/utils/types";
import { getImageryProvider } from "@/utils/tdt/tianditu";
import { useCesiumStoreHook } from "@/store/modules/cesium";
import { ref } from "vue";

defineOptions({
  name: "Welcome"
});

let tdImg; // 影像底图
let tdVec; // 矢量底图
let tdIbo; // 行政边界
let tdCia; // 注记
const showChild = ref(false);

const measurementsRef = ref(null);
const drawingsRef = ref(null);
const sliderVisibility = ref(false);

// 打开卷帘
const showSliderVisibility = () => {
  sliderVisibility.value = !sliderVisibility.value;
};

// 打开测面积
const getArea = () => {
  measurementsRef.value.toggleAction("area");
};

// 打开漫游线
const drawLine = () => {
  drawingsRef.value.toggleAction("polyline");
};

const linePositions = ref();
const drawEvt = val => {
  if (val.finished) {
    linePositions.value = val.positions;
  }
};

// 清除
const clear = () => {
  linePositions.value = null;
  measurementsRef.value.clearAll();
  drawingsRef.value.clearAll();
};

// viewer初始化
const init = () => {
  useCesiumStoreHook().setDefaultCenter({
    destination: Cesium.Cartesian3.fromDegrees(113.38, 22.52, 10000000), //设置位置
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: Cesium.Math.toRadians(0.0)
    }
  });
  window.viewer.scene.camera.setView(useCesiumStoreHook().$state.defaultCenter);

  tdImg = getImageryProvider("img");
  tdVec = getImageryProvider("vec");
  tdIbo = getImageryProvider("ibo");
  tdCia = getImageryProvider("cia");

  // 先隐藏矢量底图
  setTimeout(() => {
    const layers = window.viewer.imageryLayers;
    for (let i = 0; i < 2; i++) {
      const layer = layers.get(i);
      if (layer.imageryProvider.credit.html === "tdtImgVec") {
        layer.show = false;
        break;
      }
    }
  }, 1);
  setTimeout(() => {
    showChild.value = true;
  }, 800);
};

const viewerOption = {
  homeButton: false,
  animation: false,
  shouldAnimate: false,
  timeline: false,
  infoBox: false,
  selectionIndicator: false,
  baseLayerPicker: false,
  geocoder: false,
  fullscreenButton: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  showCredit: false,
  sceneMode: 3,
  cesiumPath: "https://cdn.staticfile.org/cesium/1.105.0/Cesium.js",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzUxZTYyYi1kZDUzLTQ4ZDgtYmIyMC00ODRkMTlkM2ZkMGMiLCJpZCI6OTA4NjgsImlhdCI6MTY4MzE4MjYxMH0.ZLRAzVEJAlDFoIQvqCn0bh0aZEWor01qZHfX3BpITVw"
};

const onViewerReady = (readyObj: VcReadyObject) => {
  // emit('viewerReady', readyObj)
  const { viewer } = readyObj;
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 300;
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.sun.show = false;
  viewer.scene.fog.enabled = false;
  viewer.scene.moon.show = false;
  viewer.scene.postProcessStages.fxaa.enabled = true;
  viewer.scene.debugShowFramesPerSecond = false;
  viewer.scene.camera.defaultZoomAmount = 5000;
  viewer.imageryLayers.removeAll();
  window.viewer = viewer;
  // useCesiumStoreHook().setCesium(viewer);
  init();
};
</script>
<style lang="scss" scoped>
.home-bg {
  position: relative;
  width: 100%;
  min-width: 1500px;
  height: 100vh;
  margin: 0 auto;

  .wind {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;
  }

  .splitView-slider {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1;
    width: 5px;
    height: 100%;
    background-color: #d3d3d3;

    &:hover {
      cursor: ew-resize;
    }
  }
}
</style>
