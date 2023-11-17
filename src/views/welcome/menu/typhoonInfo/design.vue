<template>
  <el-dialog
    v-model="showDialog"
    title="台风检测专题制图"
    width="1400px"
    :before-close="handleDialogClose"
    append-to-body
  >
    <div class="design-bg">
      <div class="d-left" ref="designCanvas">
        <div class="legend-bg" v-if="legendData?.length > 0">
          <div class="l-list">
            <div
              class="l-block"
              v-for="(item, index) of legendData"
              :key="index"
            >
              <div
                class="b-color"
                :style="{ background: item.color }"
                v-if="item.color"
              />
              <div class="b-text">{{ item.name }}</div>
            </div>
          </div>
        </div>

        <div class="l-header">{{ form.title }}</div>
        <img :src="imgUrl" alt="" />
        <div class="l-bottom">
          <div class="b-block">制图人：{{ userInfo.info.nickName }}</div>
          <div class="b-block">制图单位：{{ userInfo.info.dept.deptName }}</div>
          <div class="b-block">
            制图日期：{{ dayjs(form.date).format("YYYY年MM月DD日") }}
          </div>
        </div>
      </div>
      <div class="d-right">
        <el-form :model="form" label-width="90px">
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="制图时间">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择制图日期"
              value-format="YYYY-MM-DD"
              class="!w-full"
              :clearable="false"
              :disabled-date="disabledDate"
            />
          </el-form-item>
          <el-form-item label="制图人">
            <b>{{ userInfo.info.nickName }}</b>
          </el-form-item>
          <el-form-item label="制图单位">
            <b>{{ userInfo.info.dept.deptName }}</b>
          </el-form-item>
          <el-form-item label="">
            <el-button plain type="info" @click="handleDialogClose"
              >取消</el-button
            >
            <el-button plain type="primary" @click="exportImg">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { downloadByBase64, storageLocal } from "@pureadmin/utils";
import { DataInfo, sessionKey } from "@/utils/auth";
import { message } from "@/utils/message";
import { useLegendStoreHook } from "@/store/modules/legend";

const userInfo = storageLocal().getItem<DataInfo<number>>(sessionKey);
const legendData = computed(() => useLegendStoreHook().$state.legendData);
const showDialog = ref(false);
const designCanvas = ref(null);

const form = reactive({
  title: "",
  date: dayjs().format("YYYY-MM-DD")
});

const disabledDate = time => {
  return time.getTime() > Date.now();
};

const handleDialogClose = () => {
  showDialog.value = false;
};

const exportImg = async () => {
  if (!form.title) {
    return message("请填写标题", {
      type: "warning"
    });
  }
  if (!form.date) {
    return message("请选择日期", {
      type: "warning"
    });
  }

  const canvas = await html2canvas(designCanvas.value, {
    dpi: window.devicePixelRatio
  });
  const imageData = canvas.toDataURL("image/png");
  downloadByBase64(imageData, `${form.title}.png`);
};

const imgUrl = ref();
const getImg = () => {
  // 创建 Canvas
  const canvas = document.createElement("canvas");
  // 获取 Scene
  const scene = window.viewer.scene;

  canvas.width = scene.canvas.clientWidth;
  canvas.height = scene.canvas.clientHeight;

  // 渲染 Scene
  const context = canvas.getContext("2d");
  const pixelRatio = window.devicePixelRatio;
  scene.render();
  context.drawImage(
    scene.canvas,
    0,
    0,
    canvas.width * pixelRatio,
    canvas.height * pixelRatio,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // 将 Canvas 转为 Base64 编码的图片数据
  imgUrl.value = canvas.toDataURL("image/png");
};

const setData = () => {
  getImg();
};

defineExpose({ showDialog, setData });
</script>

<style lang="scss" scoped>
.design-bg {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .d-left {
    position: relative;
    width: 1050px;

    img {
      display: block;
      width: 100%;
    }

    .l-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 10px 0;
      font-size: 19px;
      font-weight: bold;
      text-align: center;
      background: #000;
    }

    .l-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 16px;
      text-align: center;
      background: #000;

      .b-block {
        padding: 10px 20px 8px;
      }
    }

    .legend-bg {
      position: absolute;
      right: 10px;
      bottom: 50px;
      width: 150px;
      padding: 10px 0 0 10px;
      background: #000;
      border-radius: 10px;

      .l-list {
        .l-block {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .b-color {
            width: 10px;
            height: 10px;
            margin: 0 10px 0 5px;
            border-radius: 50%;
          }

          .b-text {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }

  .d-right {
    padding-top: 20px;

    :deep(.el-input) {
      --el-input-border-color: #fff;
    }
  }
}
</style>
