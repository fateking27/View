<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/results' }"
            >成果内容展示</el-breadcrumb-item
          >
          <el-breadcrumb-item>修复进度</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 800px">
          <h1 class="text-center">
            {{ newsData.data.title }}
          </h1>
          <el-container class="mt-8 mb-2">
            <el-text style="margin-left: 100px">发布日期：</el-text>
            <el-text>{{ newsData.data.releaseTime }}</el-text>
            <el-text style="margin-left: 20px">来源：</el-text>
            <el-text>{{ newsData.data.source }}</el-text>
            <el-text class="vc-ml-auto">A字体</el-text>
            <div class="ml-5">
              <el-button size="small" @click="handleClickLarge">大</el-button>
              <el-button size="small" @click="handleClickMedium">中</el-button>
              <el-button size="small" @click="handleClickSmall">小</el-button>
            </div>
          </el-container>
          <hr class="mx-20 mb-6" />
          <el-container class="justify-center mx-32">
            <div
              :style="{ fontSize: newSize.fontSize }"
              v-html="newsData.data.content"
            />
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { detailResult } from "@/api/new";

import { useRoute } from "vue-router";

defineOptions({
  name: "Fix"
});

// const dataList = reactive({
//   data: []
// });
//
// const loading = ref(true);
//
// const form = reactive({
//   releaseStatus: "1"
// });
//
// async function showNews() {
//   loading.value = true;
//   const { rows } = await listResults(form);
//   dataList.data = rows;
//
//   loading.value = false;
// }

const route = useRoute();
const newsData = reactive({
  data: []
});

onMounted(async () => {
  const newsId = route.params.id;
  const response = await detailResult(newsId);
  // await getBrowse(newsId);
  newsData.data = response.data;
  console.log(newsData);
});

const newSize = reactive({
  data: [],
  fontSize: "18px" // 默认字体大小
});

const handleClickLarge = () => {
  newSize.fontSize = "24px";
};

const handleClickMedium = () => {
  newSize.fontSize = "18px";
};

const handleClickSmall = () => {
  newSize.fontSize = "14px";
};
</script>
