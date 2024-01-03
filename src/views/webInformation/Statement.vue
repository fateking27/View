<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/new' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/contactUs' }"
            >网站信息</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 500px">
          <h1 class="text-center">网站声明</h1>
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
                <!-- <h1 style="margin-bottom: 20px;">网站声明</h1> -->
              </div>

              <div>
                &nbsp; &nbsp; &nbsp;
                &nbsp;本网站内容由广东省国土资源厅和各市、县(市、区)国土主管部门以及相关单位提供。任何媒体、互联网站和商业机构不得利用本网站发布的内容进行商业性的原版原式地转载，也不得歪曲和篡改本网站所发布的内容。本网站所涉及到的版权归本网站所属。
                <br />
                &nbsp; &nbsp; &nbsp;
                &nbsp;本网站提供的资料如与相关纸质文本不符，以纸质文本为准。
                <br />
                &nbsp; &nbsp; &nbsp;
                &nbsp;任何媒体或互联网站不得檀自转载本网站由其他单位提供的信息和服务内容，如需转载，必须与相应提供单位直接联系获得合法授权.
                <br />
                &nbsp; &nbsp; &nbsp;
                &nbsp;广东省国土资源厅版权所有，对违反版权者保留一切追索权利。
                <br />
                <br />
                &nbsp; &nbsp; &nbsp; &nbsp;备案序号: 粤XX备XXXXXXXX号。
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
