<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-[url('/src/assets/images/news/introduce-bg.png')] bg-imge mb-8"
    >
      <div class="mt-20">
        <div class="mb-10 flex flex-row mt-20">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >REPAIRPROGRESS</text
            >
            <router-link to="/" style="position: absolute"
              >修复进度</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px" height="250px">
            <el-image :src="url" :fit="fit" />
          </el-aside>
          <el-main class="ml-10 no-padding">
            <div class="container mx-auto">
              <el-text v-for="(item, index) of dataList.data" :key="index">
                {{ item.content }}
              </el-text>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <router-link to="/display">
      <el-image
        style="width: 1200px; height: 200px; margin-top: 20px"
        src="src/assets/images/news/results.png"
      />
    </router-link>

    <div class="bg-[url('/src/assets/images/news/result-bg.png')] bg-imge mt-8">
      <div class="mt-20">
        <div class="mb-10 flex flex-row mt-20">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >CURRENTRESULTS</text
            >
            <router-link to="/" style="position: absolute"
              >当前成果</router-link
            >
          </div>
        </div>
        <el-container>
          <el-header>
            <el-container>
              <el-text> 红树林/盐生态现状： </el-text>
              <el-text>
                生态系统稳定、红树林植被、生物群落和环境要素等方面整体稳定，可自我维持
              </el-text>
            </el-container>

            <el-container>
              <el-text> 红树林/盐生态现状： </el-text>
              <el-text>
                生态系统稳定、红树林植被、生物群落和环境要素等方面整体稳定，可自我维持
              </el-text>
            </el-container>

            <el-container>
              <el-text> 红树林/盐生态现状： </el-text>
              <el-text>
                生态系统稳定、红树林植被、生物群落和环境要素等方面整体稳定，可自我维持
              </el-text>
            </el-container>
          </el-header>
          <el-main>
            <el-container style="width: 1200px; height: 300px">
              <el-image :src="url" />
              <el-image :src="url" />
              <el-image :src="url" />
            </el-container>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/display.png')] bg-imge">
      <div class="mt-20">
        <div class="mb-10 flex flex-row mt-20">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >STAGEPRESENTATION</text
            >
            <router-link to="/" style="position: absolute"
              >阶段展示</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside />
          <el-main width="80px" height="470px">
            <el-image :src="url" :fit="fit" />
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listResults } from "@/api/new";

defineOptions({
  name: "Results"
});
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const dataList = reactive({
  data: []
});

const loading = ref(true);

const form = reactive({
  releaseStatus: "1"
});

async function showNews() {
  loading.value = true;
  const { rows } = await listResults(form);
  dataList.data = rows;
  loading.value = false;
  console.log(dataList);
  // progress.value = classifyNews("修复进度");
}
// const progress = ref([]);

// const classifyNews = (newType) => {
//   return dataList.data.filter((news) => news.type=== newType);
// };

onMounted(async () => {
  await showNews();
});
</script>

<style scoped>
.container {
  width: 680px;
  height: 300px;
}

.bg-imge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-position: center;
  background-size: cover;
}
</style>
