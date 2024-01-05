<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-[url('/src/assets/images/news/introduce-bg.png')] bg-imge mb-8"
    >
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >REPAIRPROGRESS</text
            >
            <router-link
              v-for="(item, index) of progressList.data"
              :key="index"
              :to="{ name: 'Fix', params: { id: item.id } }"
              style="position: absolute"
              >修复进度</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px" height="250px">
            <el-image
              width="450px"
              height="250px"
              v-for="(item, index) of progressList.data"
              :key="index"
              :src="item.coverMaterialUrl"
            />
          </el-aside>
          <el-main class="ml-10 no-padding">
            <div class="container mx-auto">
              <div
                v-for="(item, index) of progressList.data"
                :key="index"
                v-html="item.content"
              />
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <!--    <router-link to="/display">-->
    <el-image
      style="width: 1200px; height: 200px; margin-top: 20px"
      src="src/assets/images/news/results.png"
    />
    <!--    </router-link>-->

    <div class="bg-[url('/src/assets/images/news/result-bg.png')] bg-imge mt-8">
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >CURRENTRESULTS</text
            >
            <text style="position: absolute">当前成果</text>
          </div>
        </div>
        <el-container>
          <el-header>
            <el-container>
              <el-text>现状： </el-text>
              <el-text v-for="(item, index) of dataList.data" :key="index">
                {{ item.ecologicalStatus }}
              </el-text>
            </el-container>

            <el-container>
              <el-text> 分级： </el-text>
              <el-text v-for="(item, index) of dataList.data" :key="index">
                {{ item.rank }}
              </el-text>
            </el-container>

            <el-container>
              <el-text> 功能： </el-text>
              <el-text v-for="(item, index) of dataList.data" :key="index">
                {{ item.disasterReduction }}
              </el-text>
            </el-container>
          </el-header>
          <el-main>
            <el-container style="width: 1200px; height: 300px">
              <!--              <div class="demo-image__lazy">-->
              <!--                <el-image v-for="url in urls" :key="url" :src="url" lazy />-->
              <!--              </div>-->
              <el-image :src="imgUrl" />
              <el-image :src="imgUrl" />
              <el-image :src="imgUrl" />
            </el-container>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/display.png')] bg-imge">
      <div class="my-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >STAGEPRESENTATION</text
            >
            <text to="/" style="position: absolute">阶段展示</text>
          </div>
        </div>
        <el-container>
          <el-aside>
            <div
              v-for="(item, index) of sortedPageList"
              :key="index"
              width="100px"
              class="mr-10 mt-10 flex justify-between"
            >
              <router-link :to="{ name: 'Page', params: { id: item.id } }">
                {{ item.stageName }}</router-link
              >
              <text> {{ item.stageBeginTime }} - {{ item.stageEndTime }} </text>
            </div>
          </el-aside>
          <el-main>
            <div class="block text-center" style="width: 750px; height: 800px">
              <el-carousel width="600px" height="600px">
                <el-carousel-item
                  v-for="(item, index) of pageList.data"
                  :key="index"
                  @click="handleClick(item)"
                >
                  <el-image :src="item.coverMaterialUrl" />
                  <div>
                    <text>{{ item.stageName }}</text>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div />
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from "vue";
import { listCurrent, listPage, listProgress } from "@/api/new";
import router from "@/router";

const { VITE_API_PATH } = import.meta.env;

defineOptions({
  name: "Results"
});
const imgUrl =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const dataList = reactive({
  data: []
});

const pageList = reactive({
  data: []
});
const progressList = reactive({
  data: []
});

const loading = ref(true);

const form = reactive({
  releaseStatus: "1"
});

async function showNews() {
  loading.value = true;
  const { rows } = await listCurrent(form);
  dataList.data = rows;
  loading.value = false;
  // progress.value = classifyNews("修复进度");
}
// const progress = ref([]);

// const classifyNews = (newType) => {
//   return dataList.data.filter((news) => news.type=== newType);
// };

async function showPage() {
  loading.value = true;
  const { rows } = await listPage();
  pageList.data = rows;
  console.log(pageList.data);
  pageList.data.forEach(item => {
    item.coverMaterialUrl = `${VITE_API_PATH}/static/${item.coverMaterialUrl}`;
  });
  loading.value = false;
}

const sortedPageList = computed(() => {
  const pageListCopy = pageList.data.slice();
  return pageListCopy.sort((a, b) => {
    const timeA = new Date(a.stageBeginTime).getTime();
    const timeB = new Date(b.stageBeginTime).getTime();
    return timeA - timeB;
  });
});

async function showProgress() {
  loading.value = true;
  const { rows } = await listProgress();
  progressList.data = rows;
  loading.value = false;
  progressList.data.forEach(item => {
    item.coverMaterialUrl = `${VITE_API_PATH}/static/${item.coverMaterialUrl}`;
  });
}

function handleClick(item) {
  router.push({ name: "Page", params: { id: item.id } });
}

onMounted(async () => {
  await showNews();
  await showPage();
  await showProgress();
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

.big-title {
  font-size: 44px;
  color: #ecf2ff;
}
</style>
