<template>
  <div class="flex justify-center bg-sky-100">
    <el-header class="flex justify-center mt-10">
      <el-aside>
        <el-input placeholder="关键词" v-model="keyWord.key" />
      </el-aside>
      <el-main class="no-padding">
        <el-button @click="showInformation"> 搜索 </el-button>
      </el-main>
    </el-header>
    <div class="bg-white container mx-auto p-10">
      <div v-for="(item, index) of dataList.data" :key="index">
        <h1>{{ item.title }}</h1>
        <div v-html="getContent(item.content)" />
        <el-text>发布时间{{ item.releaseTime }}</el-text>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { onSearch } from "@/api/new";
import { useRoute } from "vue-router";

const route = useRoute();
defineOptions({
  name: "Search"
});

const dataList = reactive({
  data: []
});

const keyWord = reactive({
  key: undefined
});
async function showInformation() {
  const { rows } = await onSearch(keyWord);
  dataList.data = rows;
}
const getContent = content => {
  if (content.length <= 100) {
    return content;
  } else {
    return content.substring(0, 300) + "...";
  }
};

onMounted(async () => {
  keyWord.key = route.params.keyWord;
  console.log(keyWord.key);
  const { rows } = await onSearch(keyWord);
  dataList.data = rows;
});
</script>
