<template>
  <el-dialog v-model="showDialog" title="设置点" width="30%">
    <el-form :model="form" label-width="60px">
      <el-form-item label="经度">
        <el-input v-model="form.longitude" />
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.latitude" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="setLocation"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import { isLatitude, isLongitude } from "@/utils/rule";
import locationIcon from "@/assets/images/location-icon.png";

let setLocationBillboards;
const showDialog = ref(false);
const form = reactive({
  longitude: null,
  latitude: null
});

const closeDialog = () => {
  showDialog.value = false;
};

const setLocation = () => {
  if (!form.longitude || !form.latitude) {
    return message("请填写经纬度", {
      type: "warning"
    });
  }
  if (!isLongitude(form.longitude)) {
    return;
  }
  if (!isLatitude(form.latitude)) {
    return;
  }

  setLocationBillboards = window.viewer.scene.primitives.add(
    new Cesium.BillboardCollection()
  );

  setLocationBillboards.add({
    name: "setLocationBillboards",
    position: Cesium.Cartesian3.fromDegrees(form.longitude, form.latitude, 1),
    image: locationIcon,
    scale: 1,
    width: 30,
    height: 30
  });

  window.viewer.camera.flyTo({
    duration: 1.8,
    destination: Cesium.Cartesian3.fromDegrees(
      form.longitude,
      form.latitude,
      5000000
    ), //设置位置
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: Cesium.Math.toRadians(0.0)
    }
  });

  form.longitude = null;
  form.latitude = null;

  closeDialog();
};

const destroyLocationBillboards = () => {
  if (setLocationBillboards) {
    setLocationBillboards.destroy();
  }
};

defineExpose({ showDialog, destroyLocationBillboards });
</script>
