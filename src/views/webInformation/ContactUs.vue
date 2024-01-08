<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/new' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/contactUs' }"
            >联系我们</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 600px">
          <h1 class="text-center">联系我们</h1>
          <el-container class="mt-8 mb-2">
            <el-text style="margin-left: 100px">时间：</el-text>
            <el-text>{{
              moment(newsData.data.releaseTime).format("YYYY-MM-DD")
            }}</el-text>
            <el-text style="margin-left: 20px">来源：本网</el-text>
            <el-text style="margin-left: 600px">A字体</el-text>
            <div class="ml-5">
              <el-button size="small" @click="handleClickLarge">大</el-button>
              <el-button size="small" @click="handleClickMedium">中</el-button>
              <el-button size="small" @click="handleClickSmall">小</el-button>
            </div>
          </el-container>
          <hr class="mx-20 mb-6" />
          <el-container class="justify-center mx-32">
            <div :style="{ fontSize: newSize.fontSize }">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  width: 1100px;
                  font-size: large;
                "
              >
                <!-- <h1 style="margin-bottom: 20px;">联系我们</h1> -->
              </div>

              <div>
                <table class="mb-10" style="width: 1100px">
                  <tbody>
                    <tr>
                      <td class="border">主办单位：</td>
                      <td class="border">
                        中国电建集团昆明勘测设计研究院有限公司
                      </td>
                    </tr>
                    <tr>
                      <td class="border">地址：</td>
                      <td class="border">云南昆明人民东路115号</td>
                    </tr>
                    <tr>
                      <td class="border">邮编：</td>
                      <td class="border">510620</td>
                    </tr>
                    <tr>
                      <td class="border">网 址：</td>
                      <td class="border">xxxxx</td>
                    </tr>
                    <tr>
                      <td class="border">电 话：</td>
                      <td class="border">
                        0871-63062050(总经理工作部) 0871-63062729(市场开发部)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import moment from "moment";

defineOptions({
  name: "ContactUs"
});

const newsData = reactive({
  data: []
});

const newSize = reactive({
  data: [],
  fontSize: "16px" // 默认字体大小
});

const handleClickLarge = () => {
  newSize.fontSize = "24px";
};

const handleClickMedium = () => {
  newSize.fontSize = "16px";
};

const handleClickSmall = () => {
  newSize.fontSize = "12px";
};
</script>

<style scoped>
.mb-10 tr .border:first-child {
  padding: 10px;
  text-align: right;
}

.mb-10 tr .border:last-child {
  /* height: 40px; */
  padding: 10px;
}
</style>
