<template>
  <div class="tool-bg" :class="{ show: showChild }">
    <div class="t-big-bg">
      <el-popover
        :visible="roamVisible"
        placement="right"
        :width="300"
        trigger="click"
      >
        <template #reference>
          <div class="b-block" @click="showRoam">
            <div class="iconfont icon-manyou" />
            <div class="b-name">漫游</div>
          </div>
        </template>

        <el-button plain type="primary" @click="drawFlyLine"
          >绘制线路</el-button
        >
        <el-button plain type="danger" @click="clearDraw">清除线路</el-button>
        <div v-show="linePositions">
          <el-divider />
          <el-button plain type="primary" @click="startFly">飞行</el-button>
          <el-button plain type="info" @click="stopFly">停止</el-button>
          <el-button plain type="danger" @click="clearFly">退出</el-button>
        </div>
      </el-popover>

      <div class="b-block" @click="getArea">
        <div class="iconfont icon-cemianji" />
        <div class="b-name" v-show="!showArea">测面积</div>
        <div class="b-name" v-show="showArea">退出</div>
      </div>
      <div class="b-block" @click="openSplitView">
        <div class="iconfont icon-a-juanlian1" />
        <div class="b-name">{{ showSplitView ? "退出" : "卷帘" }}</div>
      </div>
      <div class="b-block" @click="fullscreen">
        <div class="iconfont icon-suofang" />
        <div class="b-name">全屏</div>
      </div>
    </div>
    <div class="t-small-bg">
      <div class="iconfont icon-fangda" @click="zoomIn" />
      <div class="iconfont icon-fangxiao" @click="zoomOut" />
      <div class="iconfont icon-zuobiao" @click="setLocationShow" />
      <div class="iconfont icon-a-qingsao11" @click="retSet" />
      <div class="iconfont icon-a-shuaxin201" @click="to2D" />
      <div class="iconfont icon-a-shuaxin301" @click="to3D" />
    </div>
    <div class="t-big-bg">
      <el-popover
        :visible="legendVisible"
        placement="right"
        :width="310"
        trigger="click"
        v-if="legendData?.length > 0"
      >
        <template #reference>
          <div class="b-block" @click="showLegend">
            <div class="iconfont icon-tuli" />
            <div class="b-name">图例</div>
          </div>
        </template>
        <Legend />
      </el-popover>

      <el-popover
        :visible="switchMapVisible"
        placement="right"
        :width="230"
        trigger="click"
      >
        <template #reference>
          <div class="b-block" @click="switchMap">
            <div class="iconfont icon-diqiu" />
            <div class="b-name">切换</div>
          </div>
        </template>

        <div class="switchMap-bg">
          <div
            class="m-block"
            :class="{ active: switchMapType === 1 }"
            @click="handleSwitchMapType(1)"
          >
            <div class="b-img b1" />
            <div class="i-text">影像</div>
          </div>
          <div
            class="m-block"
            :class="{ active: switchMapType === 2 }"
            @click="handleSwitchMapType(2)"
          >
            <div class="b-img b2" />
            <div class="i-text">矢量</div>
          </div>
          <div
            class="m-block"
            :class="{ active: switchMapType === 3 }"
            @click="handleSwitchMapType(3)"
          >
            <div class="b-img b3" />
            <div class="i-text">三维</div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>

  <SplitView ref="splitViewRef" />
  <SetLocation ref="setLocationRef" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useCesiumStoreHook } from "@/store/modules/cesium";
import { fly, clearFlyData } from "@/views/welcome/tool/roam/fly";
import {
  clearSplitView,
  splitView
} from "@/views/welcome/tool/splitView/split";
import Legend from "./legend/legend.vue";
import SplitView from "./splitView/splitView.vue";
import SetLocation from "./setLocation/setLocation.vue";
import { useLegendStoreHook } from "@/store/modules/legend";

const props = defineProps({
  showChild: {
    require: false,
    type: Boolean
  },
  linePositions: {
    require: false,
    type: Array
  }
});

//漫游
const roamVisible = ref(false);
const showRoam = () => {
  roamVisible.value = !roamVisible.value;
};

const drawFlyLine = () => {
  emit("drawLine");
};

let startFlyState = false; //初始化飞行状态
const startFly = () => {
  if (!startFlyState) {
    fly(props.linePositions);
    startFlyState = true;
  } else {
    window.viewer.clock.shouldAnimate = true;
  }
};

const stopFly = () => {
  window.viewer.clock.shouldAnimate = false;
};

// 重置漫游
const clearFly = () => {
  startFlyState = false;
  clearFlyData();
  useCesiumStoreHook().clear();
  clearDraw();
};

// 卷帘
const showSplitView = ref(false);
const splitViewRef = ref(null);
const openSplitView = () => {
  emit("showSliderVisibility");
  if (showSplitView.value) {
    clearSplitView();
    splitViewRef.value.showBlock = false;
  } else {
    splitViewRef.value.showBlock = true;
    setTimeout(() => {
      splitView();
    }, 1);
  }
  showSplitView.value = !showSplitView.value;
};

// 测面积
const showArea = ref(false);
const getArea = () => {
  if (!showArea.value) {
    emit("getArea");
  } else {
    clearDraw();
  }
  showArea.value = !showArea.value;
};

const clearDraw = () => {
  emit("clear");
};

// 全屏
const fullscreen = () => {
  Cesium.Fullscreen.requestFullscreen(document.body);
};

const zoomInByMove = flag => {
  const position = window.viewer.camera.positionCartographic;
  // 1表示放大，0表示缩小
  if (flag) {
    window.viewer.camera.zoomIn(position.height * 0.5);
  } else {
    window.viewer.camera.zoomOut(position.height * 0.5);
  }
};
// 放大方法
const zoomIn = () => {
  zoomInByMove(1);
};

// 缩小方法
const zoomOut = () => {
  zoomInByMove(0);
};

// 增加点
const setLocationRef = ref(null);
const setLocationShow = () => {
  setLocationRef.value.showDialog = true;
};

// 转2D
const to2D = () => {
  window.viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW;
};

// 转3D
const to3D = () => {
  window.viewer.scene.mode = Cesium.SceneMode.SCENE3D;
  // const scene = window.viewer.scene;
  // scene.morphTo3D(0);
};

const retSet = () => {
  // useCesiumStoreHook().clear();
  to2D();
  // window.viewer.imageryLayers.get(0).show = true;
  // window.viewer.imageryLayers.get(1).show = false;
  window.viewer.scene.camera.setView(useCesiumStoreHook().$state.defaultCenter);
  setLocationRef.value.destroyLocationBillboards();
};

// 图例
const legendVisible = ref(false);
const legendData = computed(() => useLegendStoreHook().$state.legendData);
const showLegend = () => {
  legendVisible.value = !legendVisible.value;
};

// 切换底图
const switchMapType = ref(1);
const switchMapVisible = ref(false);
const switchMap = () => {
  switchMapVisible.value = !switchMapVisible.value;
};
const handleSwitchMapType = type => {
  switchMapType.value = type;
  let typeText;
  if (type === 1 || type === 3) {
    typeText = "tdtImgBase";
  } else if (type === 2) {
    typeText = "tdtImgVec";
  }
  // 遍历每个图层，找到指定的底图
  const layers = window.viewer.imageryLayers;
  for (let i = 0; i < 2; i++) {
    const layer = layers.get(i);
    layer.show = layer.imageryProvider.credit.html === typeText;
  }
  if (type === 3) {
    window.viewer.terrainProvider =
      new Cesium.ArcGISTiledElevationTerrainProvider({
        url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
      });
  } else {
    window.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
  }
};

const emit = defineEmits<{
  (e: "drawLine"): void;
  (e: "getArea"): void;
  (e: "clear"): void;
  (e: "showSliderVisibility"): void;
}>();
</script>

<style lang="scss" scoped>
.tool-bg {
  position: fixed;
  top: 60px;
  right: -65px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 65px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    rgb(13 54 110 / 65%) 0%,
    rgb(13 54 110 / 95%) 100%
  );
  transition: all ease 1s;

  &.show {
    right: 10px;
  }

  .t-big-bg {
    width: 100%;

    .b-block {
      width: 70%;
      padding: 15px 0;
      margin: 0 auto;
      font-size: 13px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      cursor: pointer;
      border-bottom: 1px solid #1b7ef2;
      transition: all ease 0.2s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        transform: scale(0.92);
      }

      .iconfont {
        font-size: 22px;
        color: #1b7ef2;
      }

      .b-name {
        margin-top: 5px;
      }
    }
  }

  .t-small-bg {
    width: 100%;
    text-align: center;

    .iconfont {
      margin-bottom: 10px;
      font-size: 22px;
      color: #1b7ef2;
      cursor: pointer;
      transition: all ease 0.2s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        transform: scale(0.92);
      }
    }
  }

  .splitView-slider {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 9999;
    width: 5px;
    height: 100%;
    background-color: #d3d3d3;

    &:hover {
      cursor: ew-resize;
    }
  }
}

.switchMap-bg {
  display: flex;
  justify-content: space-between;

  .m-block {
    position: relative;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    cursor: pointer;
    transition: all ease 0.2s;

    &.active {
      border: 3px solid #1b7ef2;
    }

    &:hover {
      transform: scale(0.95);
    }

    .b-img {
      width: 100%;
      height: 100%;

      &.b1 {
        background: url("@/assets/images/switchMap/tab-icon1.png") no-repeat
          center;
        background-size: cover;
      }

      &.b2 {
        background: url("@/assets/images/switchMap/tab-icon2.png") no-repeat
          center;
        background-size: cover;
      }

      &.b3 {
        background: url("@/assets/images/switchMap/tab-icon3.png") no-repeat
          center;
        background-size: cover;
      }
    }

    .i-text {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-top: 4px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      background: #1b7ef2;
    }
  }
}
</style>
