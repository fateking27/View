<template>
  <div class="windPoint-bg">
    <el-drawer
      v-model="showDrawer"
      :title="`海洋场-${form.typeName}`"
      :before-close="handleDrawerClose"
      size="280"
      modal-class="menu-drawer windNC"
    >
      <el-date-picker
        v-model="form.day"
        type="date"
        :placeholder="`请选择${form.typeName}日期`"
        value-format="YYYY-MM-DD"
        class="!w-full"
        @change="onSearch"
        :disabled-date="disabledDate"
      />
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import dayjs from "dayjs";
import { getWindNoaa } from "@/api/home";
import CesiumWind from "./cesiumWind";
import oceanGuide from "./oceanGuide.json";

const disabledDate = time => {
  return time.getTime() > Date.now();
};

const showDrawer = ref(false);

const form = reactive({
  type: "",
  typeName: "",
  day: dayjs().format("YYYY-MM-DD"),
  windAreaLandParcelId: ""
});

const handleDrawerClose = () => {
  showDrawer.value = false;
};

const onSearch = () => {
  if (form.day) {
    clearWind();
    getWindNC();
  } else {
    return message(`请选择${form.typeName}日期`, {
      type: "warning"
    });
  }
};

let windLayer;
const windOptions = {
  // colorScale: [
  //   "rgb(36,104, 180)",
  //   "rgb(60,157, 194)",
  //   "rgb(128,205,193 )",
  //   "rgb(151,218,168 )",
  //   "rgb(198,231,181)",
  //   "rgb(238,247,217)",
  //   "rgb(255,238,159)",
  //   "rgb(252,217,125)",
  //   "rgb(255,182,100)",
  //   "rgb(252,150,75)",
  //   "rgb(250,112,52)",
  //   "rgb(245,64,32)",
  //   "rgb(237,45,28)",
  //   "rgb(220,24,32)",
  //   "rgb(180,0,35)"
  // ],
  // paths: 1000,
  // frameRate: 10,
  // maxAge: 20,
  // globalAlpha: 0.9,
  // velocityScale: 1 / 30
};

const getWindNC = () => {
  if (form.type === "wind") {
    getWindNoaa({
      type: form.type,
      day: form.day
    }).then(res => {
      if (res.data) {
        const resData = JSON.parse(res.data);
        windLayer = new CesiumWind(resData, { windOptions });
        windLayer.addTo(window.viewer);
      } else {
        return message(
          `${dayjs(form.day).format("YYYY年MM月DD日")}暂无${form.typeName}数据`,
          {
            type: "warning"
          }
        );
      }
    });
  } else if (form.type === "oceanCurrent") {
    windLayer = new CesiumWind(oceanGuide, { windOptions });
    windLayer.addTo(window.viewer);
  }
};

const clearWind = () => {
  if (windLayer) {
    windLayer.remove();
  }
};

const clear = () => {
  handleDrawerClose();
  clearWind();
};

const setData = type => {
  form.type = type;
  if (form.type === "wind") {
    form.typeName = "风场";
  } else if (form.type === "oceanCurrent") {
    form.typeName = "洋流";
  } else if (form.type === "wave") {
    form.typeName = "波浪";
  }
  getWindNC();
};

defineExpose({ showDrawer, clear, setData });
</script>
