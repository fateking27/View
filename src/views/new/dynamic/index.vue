<template>
  <div class="flex flex-col items-center">
    <el-container>
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
        <div class="mt-5">
          <div class="mb-10 flex flex-row mt-5">
            <el-image src="/src/assets/images/title/arrow-left.png" />
            <div class="text-3xl ml-2" style="position: relative; width: 90%">
              <text class="ml-10 mt-4 big-title" style="position: absolute"
                >WORK DYNAMICS</text
              >
              <div style="position: absolute">工作动态</div>
            </div>
          </div>
          <ul class="mb-20">
            <li
              v-for="(item, index) of workNews"
              :key="index"
              class="flex justify-between"
            >
              <router-link
                :to="{ name: 'Information', params: { id: item.id } }"
                class="mr-12 mb-2 newsTitle"
                >{{ item.name }}</router-link
              >
              <span>{{ moment(item.releaseTime).format("YYYY-MM-DD") }}</span>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listNew } from "@/api/new";
import moment from "moment";

const dataList = reactive({
  data: []
});

const loading = ref(true);

const form = reactive({
  releaseStatus: "1"
});

async function showNews() {
  loading.value = true;
  const { rows } = await listNew(form);
  dataList.data = rows;
  loading.value = false;
  // console.log(dataList.data[0].type)
  workNews.value = classifyNews("工作动态");
  console.log(workNews);
}
const workNews = ref([]);
// const publishNews = (status) => {
//   return dataList.data.filter((news) => news.release_status === status);
// };

const classifyNews = newType => {
  return dataList.data.filter(news => news.type === newType);
};

onMounted(async () => {
  await showNews();
});
</script>

<style>
.bg-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.newsTitle {
  padding-left: 5px;
  border-left: 5px solid #5587eb;
}

.big-title {
  font-size: 44px;
  color: #ecf2ff;
}
</style>
