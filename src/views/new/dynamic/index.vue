<template>
  <div class="flex flex-col items-center">
    <div class="mt-20">
      <div class="mb-10 flex flex-row mt-20">
        <el-image src="/src/assets/images/title/arrow-left.png" />
        <div class="text-3xl ml-2" style="position: relative; width: 90%">
          <text class="ml-10 mt-4 big-title" style="position: absolute"
            >WORD DYNAMICS</text
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
          <span>{{ moment(item.releaseTime).format("MM-DD") }}</span>
        </li>
      </ul>
    </div>
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
