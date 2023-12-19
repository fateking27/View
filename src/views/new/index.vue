<template>
  <div class="flex flex-col items-center">
    <div class="bg-image bg-[url('/src/assets/images/news/new-bg.png')]">
      <div class="mt-20">
        <div class="mb-10 flex flex-row mt-20">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >WORD DYNAMICS</text
            >
            <router-link to="/dynamic" style="position: absolute"
              >工作动态</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="455px">
            <el-image width="450px" height="250px" :src="url" />
          </el-aside>
          <el-main class="ml-8 mt-5">
            <div
              class="flex justify-between items-center mb-2"
              style="position: relative"
            >
              <h4 class="title ml-5 mt-5">最新</h4>
              <el-image
                src="/src/assets/images/title/new.png"
                style="position: absolute"
              />
              <router-link to="/dynamic">更多>></router-link>
            </div>
            <ul>
              <li
                v-for="(item, index) of workNews.slice(0, 5)"
                :key="index"
                class="flex justify-between"
              >
                <router-link
                  :to="{ name: 'Information', params: { id: item.id } }"
                  class="mr-12 mb-2 newsTitle"
                  >{{ item.name }}</router-link
                >
                <div class="flex items-center">
                  <span
                    class="mr-8 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span>{{ moment(item.releaseTime).format("MM-DD") }}</span>
                </div>
              </li>
            </ul>
          </el-main>
        </el-container>
      </div>

      <div class="mt-5">
        <el-container>
          <el-aside width="460px">
            <el-row>
              <el-image class="w-56 h-32 mr-2 mb-2" :src="url" :fit="fit" />
              <el-image class="w-56 h-32 mb-2" :src="url" :fit="fit" />
            </el-row>
            <el-row>
              <el-image class="w-56 h-32 mr-2 mb-2" :src="url" :fit="fit" />
              <el-image class="w-56 h-32 mb-2" :src="url" :fit="fit" />
            </el-row>
          </el-aside>
          <el-main class="ml-8 mt-5" width="800dx">
            <div
              class="flex justify-between items-center mb-2"
              style="position: relative"
            >
              <h4 class="title ml-5 mt-5">最热</h4>
              <el-image
                src="/src/assets/images/title/hot.png"
                style="position: absolute"
              />
              <router-link to="/dynamic">更多>></router-link>
            </div>
            <ul>
              <li
                v-for="(item, index) of workNews.slice(0, 5)"
                :key="index"
                class="flex justify-between"
              >
                <router-link
                  :to="{ name: 'Information', params: { id: item.id } }"
                  class="mr-12 mb-2 newsTitle"
                  >{{ item.name }}</router-link
                >
                <div class="flex items-center">
                  <span
                    class="mr-8 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span>{{ moment(item.releaseTime).format("MM-DD") }}</span>
                </div>
              </li>
            </ul>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/progress-bg.png')] bg-image">
      <div class="my-20">
        <div class="mb-10 flex flex-row mt-20">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >PROGRESSRESULTS</text
            >
            <router-link to="/progress" style="position: absolute"
              >进展成效</router-link
            >
          </div>
        </div>
        <el-container>
          <el-main class="mr-8 mt-5">
            <ul>
              <li
                v-for="(item, index) of progressNews.slice(0, 5)"
                :key="index"
                class="flex justify-between"
              >
                <router-link
                  :to="{ name: 'Information', params: { id: item.id } }"
                  class="mr-12 mb-2 newsTitle"
                  >{{ item.name }}</router-link
                >
                <div class="flex items-center">
                  <span
                    class="mr-8 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span>{{ moment(item.releaseTime).format("MM-DD") }} </span>
                </div>
              </li>
            </ul>
          </el-main>
          <el-aside width="455px">
            <el-image width="450px" height="250px" :src="url" :fit="fit" />
          </el-aside>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listNew } from "@/api/new";
import moment from "moment";

const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
defineOptions({
  name: "New"
});

const dataList = reactive({
  data: []
});

const loading = ref(true);

const progressNews = ref([]);
const workNews = ref([]);

async function showNews() {
  loading.value = true;
  const { rows } = await listNew();
  dataList.data = rows;
  workNews.value = classifyNews("工作动态");
  progressNews.value = classifyNews("进展成效");
}

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
