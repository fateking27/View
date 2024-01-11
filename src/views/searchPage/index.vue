<template>
  <div class="common-layout bg-sky-100">
    <el-container class="w-4/5 m-auto" style="max-width: 1380px">
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item>{{
            textContent.content.articleTypeName
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            textContent.content.type
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="bg-white container mx-auto p-10" style="min-height: 800px">
          <h1 class="text-center">{{ textContent.content.title }}</h1>
          <el-container class="mt-8 mb-2">
            <el-text style="margin-left: 100px">发布日期：</el-text>
            <el-text>{{
              moment(textContent.content.releaseTime).format("YYYY-MM-DD")
            }}</el-text>
            <el-text style="margin-left: 20px">来源：</el-text>
            <el-text>{{ textContent.content.source }}</el-text>
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
              v-html="textContent.content.content"
            />
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

const routerUse = useRouter();

// const route = useRoute();
defineOptions({
  name: "searchPage"
});

const newsData = reactive({
  data: JSON.parse(localStorage.getItem("searchData"))
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

const textContent = reactive({
  content: {}
});

const searchData = data => {
  const title = routerUse.currentRoute.value.fullPath.split("?")[1];
  // console.log(data);
  console.log(decodeURI(title));

  textContent.content = data.find(item => item.title == decodeURI(title)); //解决乱码问题

  // console.log(textContent.content);
  // console.log(data.find(item => item.title == decodeURI(title)));
};

onMounted(() => {
  searchData(newsData.data);
});
</script>
