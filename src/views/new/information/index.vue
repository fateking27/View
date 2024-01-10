<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/new' }"
            >新闻信息</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-if="newsData.data.type === '工作动态'"
            :to="{ path: '/dynamic' }"
            >工作动态</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-if="newsData.data.type === '进展成效'"
            :to="{ path: '/progress' }"
            >进展成效</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 800px">
          <h1 class="text-center">{{ newsData.data.name }}</h1>
          <el-container class="mt-8 mb-2">
            <el-text style="margin-left: 100px">发布日期：</el-text>
            <el-text>{{
              moment(newsData.data.releaseTime).format("YYYY-MM-DD")
            }}</el-text>
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
import { useRoute } from "vue-router";
import { getBrowse } from "@/api/new";
import moment from "moment";

const route = useRoute();
defineOptions({
  name: "Information"
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

onMounted(async () => {
  const newsId = route.params.id;
  const response = await getBrowse(newsId);
  newsData.data = response.data;
  console.log(newsData);
});
</script>
