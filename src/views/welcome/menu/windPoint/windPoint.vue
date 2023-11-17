<template>
  <div class="windPoint-bg">
    <el-drawer
      v-model="showDrawer"
      title="海洋风场"
      :before-close="handleDrawerClose"
      size="280"
      modal-class="menu-drawer windPoint"
    >
      <el-date-picker
        v-model="form.year"
        type="year"
        placeholder="请选择海洋风场年份"
        value-format="YYYY"
        class="!w-full"
        @change="onSearch"
      />
    </el-drawer>
    <LayerOverlay ref="layerOverlayRef" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import {
  // getSeaAreaLandParcelInfo,
  getWindAreaLandParcelInfo,
  getWindPointByYear,
  getWindPointYears
} from "@/api/home";
import dayjs from "dayjs";
import { setEntity } from "@/views/welcome/menu/components/setEntity";
import { ElLoading } from "element-plus";
import {
  createWindPointHandler,
  removeDraw,
  drawWindPoint
} from "@/views/welcome/menu/windPoint/draw";
import LayerOverlay from "@/views/welcome/menu/components/layerOverlay/layerOverlay.vue";

const layerOverlayRef = ref(null);
const showDrawer = ref(false);
// const sliderValue = ref(0);

const form = reactive({
  year: "",
  windAreaLandParcelId: ""
});

const handleDrawerClose = () => {
  showDrawer.value = false;
};

const getList = async () => {
  loading = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0, 0, 0, 0.7)"
  });
  const res = await getWindPointByYear(form);
  const resData = res.data;
  if (resData?.length === 0) {
    loading.close();
    return message(
      `暂无${form.year}年${form.windAreaLandParcelId}海洋风场数据`,
      {
        type: "warning"
      }
    );
  } else {
    drawWindPoint(resData, () => {
      // 从叠层组件过来不再二次加载
      if (fromModule !== "fromLayerOverlay") {
        layerOverlayRef.value.setData("windPoint");
        layerOverlayRef.value.showBlock = true;
      }
      loading.close();
    });
  }
};

const onSearch = () => {
  if (form.year) {
    getList();
  } else {
    return message("请选择海洋风场年份", {
      type: "warning"
    });
  }
};

const drawWindAreaLandParcel = async () => {
  const res = await getWindAreaLandParcelInfo();
  const resData = JSON.parse(res.data);
  if (resData?.crs) {
    delete resData.crs;
  }
  setEntity(resData, "windArea");
};

const getWindPointYearsApi = () => {
  getWindPointYears().then(res => {
    const resData = res.data;
    form.year = dayjs(resData[resData.length - 1].toString()).format("YYYY");
    getList();
  });
};

const clear = () => {
  removeDraw();
  handleDrawerClose();
  layerOverlayRef.value.showBlock = false;
};

let loading;
let fromModule;
const setData = (from?) => {
  fromModule = from;
  // 从叠层组件过来不加载鼠标事件
  if (fromModule !== "fromLayerOverlay") {
    createWindPointHandler();
  }
  // drawSeaAreaLandParcel();
  drawWindAreaLandParcel();
  getWindPointYearsApi();
};

defineExpose({ showDrawer, clear, setData });
</script>
