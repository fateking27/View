<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/introduce' }"
            >门户及项目介绍</el-breadcrumb-item
          >
          <el-breadcrumb-item>项目来源</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div
          class="bg-white container mx-auto"
          style="width: 1200px; min-height: 800px"
        >
          <h1 class="text-center">{{ dataList.data.name }}</h1>
          <el-container class="mt-10 mb-2">
            <el-text style="margin-left: 150px">发布日期：</el-text>
            <el-text>{{
              moment(dataList.data.releaseTime).format("YYYY-MM-DD")
            }}</el-text>
            <el-text style="margin-left: 20px">来源：</el-text>
            <el-text>本网</el-text>
            <el-text style="margin-left: 600px">A字体</el-text>
          </el-container>
          <hr class="mx-24 mb-6" />
          <el-container class="justify-center">
            <el-text style="width: 1000px; height: auto" class="indent-7">
              {{ dataList.data.content }}
            </el-text>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listIntroduce } from "@/api/new";
import moment from "moment";

defineOptions({
  name: "Detail"
});

const dataList = reactive({
  data: []
});

const loading = ref(true);

async function showNews() {
  loading.value = true;
  const { rows } = await listIntroduce();
  dataList.data = rows;
  console.log(dataList);
}

onMounted(async () => {
  await showNews();
});
</script>
