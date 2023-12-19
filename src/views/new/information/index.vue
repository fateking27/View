<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/new' }"
            >新闻动态</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: '/dynamic' }"
            >工作动态</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div
          class="bg-white container mx-auto"
          style="width: 1200px; min-height: 800px"
        >
          <h1 class="text-center">{{ newsData.data.name }}</h1>
          <el-container class="mt-10 mb-2">
            <el-text style="margin-left: 150px">发布日期：</el-text>
            <el-text>{{
              moment(newsData.data.releaseTime).format("YYYY-MM-DD")
            }}</el-text>
            <el-text style="margin-left: 20px">来源：</el-text>
            <el-text>本网</el-text>
            <el-text style="margin-left: 600px">A字体</el-text>
          </el-container>
          <hr class="mx-24 mb-6" />
          <el-container class="justify-center">
            <el-text style="width: 1000px; height: auto" class="indent-7">
              {{ newsData.data.content }}
            </el-text>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getNew } from "@/api/new";
import moment from "moment";

const route = useRoute();
defineOptions({
  name: "Information"
});

const newsData = reactive({
  data: []
});

onMounted(async () => {
  const newsId = route.params.id;
  const response = await getNew(newsId);
  newsData.data = response.data;
  console.log(newsData);
});
</script>
