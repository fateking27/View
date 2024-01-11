<template>
  <div class="flex justify-center bg-sky-100">
    <el-header class="flex justify-center mt-10">
      <el-aside width="750px">
        <el-input
          placeholder="请输入关键词"
          v-model="keyWord.key"
          style="height: 50px"
        />
      </el-aside>
      <el-main class="no-padding">
        <el-button
          @click="showInformation"
          style="height: 50px"
          type="primary"
          :icon="useRenderIcon(Search)"
        >
          搜索
        </el-button>
      </el-main>
    </el-header>
    <div
      class="bg-white container mx-auto p-10 w-4/5 my-6"
      style="min-height: 500px"
    >
      <div v-show="dataList.data.length > 0">
        <div v-for="(item, index) of dataList.data" :key="index">
          <router-link :to="'/searchPage?' + item.title"
            ><h3>{{ item.title }}</h3></router-link
          >

          <div v-html="getContent(item.content)" class="mt-4" />

          <el-text class="flex justify-start" style="margin-top: 20px"
            >发布时间{{ item.releaseTime }}</el-text
          >
          <hr class="mt-4 mb-10" style="border: 1px solid gray" />
        </div>
      </div>
      <div
        v-show="dataList.data.length === 0"
        class="flex justify-center items-center"
      >
        <el-image src="/src/assets/layout/search_noResult_icon.png" />
        <el-text>抱歉，没有搜索到相应的结果,请检查关键字是否有效</el-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { onSearch } from "@/api/new";
import { useRoute } from "vue-router";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";

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
    return content.substring(0, 150) + "...";
  }
};

onMounted(async () => {
  keyWord.key = route.params.keyWord;
  console.log(keyWord.key);
  const { rows } = await onSearch(keyWord);
  dataList.data = rows;
  localStorage.setItem("searchData", JSON.stringify(rows));
});
</script>
