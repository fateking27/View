<template>
  <div class="flex flex-col items-center">
    <div class="bg-image bg-[url('/src/assets/images/news/new-bg.png')]">
      <div class="mt-10">
        <div class="my-8 flex flex-row">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >WORK DYNAMICS</text
            >
            <router-link to="/dynamic" style="position: absolute"
              >工作动态</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px">
            <div>
              <el-carousel width="450px" height="300px">
                <el-carousel-item
                  v-for="(item, index) of workNews.slice(0, 4)"
                  :key="index"
                  @click="handleClick(item)"
                >
                  <el-image
                    class="cursor-pointer"
                    style="width: 450px; height: 250px"
                    :src="item.coverMaterialUrl"
                  />
                  <div class="flex justify-center">
                    <text style="font-size: 12px; text-align: center">{{
                      item.name
                    }}</text>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-aside>
          <el-main class="ml-8">
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
                v-for="(item, index) of workNews.slice(5, 9)"
                :key="index"
                class="flex justify-between"
              >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="item.name"
                  placement="top-start"
                  show-after="500"
                >
                  <router-link
                    :to="{ name: 'Information', params: { id: item.id } }"
                    class="mr-12 mb-2 newsTitle"
                    >{{
                      item.name.slice(0, 25) +
                      (item.name.length > 25 ? "..." : "")
                    }}</router-link
                  >
                </el-tooltip>
                <div class="flex items-center">
                  <span
                    class="mr-6 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span>{{
                    moment(item.releaseTime).format("YYYY-MM-DD")
                  }}</span>
                </div>
              </li>
            </ul>
          </el-main>
        </el-container>
      </div>

      <div class="mt-5">
        <el-container>
          <el-aside width="450px">
            <el-row class="image">
              <el-tooltip
                v-for="(item, index) of viewNews.slice(0, 2)"
                :key="index"
                class="box-item"
                effect="dark"
                :content="item.name"
                placement="top-start"
                show-after="500"
              >
                <el-image
                  class="w-56 h-32 mr-2 mb-2 cursor-pointer"
                  :src="item.coverMaterialUrl"
                  @click="handleClick(item)"
                />
              </el-tooltip>
            </el-row>
            <el-row class="image">
              <el-tooltip
                v-for="(item, index) of viewNews.slice(3, 5)"
                :key="index"
                class="box-item"
                effect="dark"
                :content="item.name"
                placement="top-start"
                show-after="500"
              >
                <el-image
                  class="w-56 h-32 mr-2 mb-2 cursor-pointer"
                  :src="item.coverMaterialUrl"
                  @click="handleClick(item)"
                />
              </el-tooltip>
            </el-row>
          </el-aside>
          <el-main class="ml-8">
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
                v-for="(item, index) of viewNews.slice(5, 9)"
                :key="index"
                class="flex justify-between"
              >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="item.name"
                  placement="top-start"
                  show-after="500"
                >
                  <router-link
                    :to="{ name: 'Information', params: { id: item.id } }"
                    class="mr-12 mb-2 newsTitle"
                    >{{
                      item.name.slice(0, 25) +
                      (item.name.length > 25 ? "..." : "")
                    }}</router-link
                  >
                </el-tooltip>
                <div class="flex items-center">
                  <span
                    class="mr-6 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span>{{
                    moment(item.releaseTime).format("YYYY-MM-DD")
                  }}</span>
                </div>
              </li>
            </ul>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/progress-bg.png')] bg-image">
      <div class="my-20">
        <div class="mb-10 flex flex-row mt-10">
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
                v-for="(item, index) of progressNews.slice(0, 4)"
                :key="index"
                class="flex justify-between"
              >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="item.name"
                  placement="top-start"
                  show-after="500"
                >
                  <router-link
                    :to="{ name: 'Information', params: { id: item.id } }"
                    class="mr-12 mb-2 newsTitle"
                    >{{
                      item.name.slice(0, 25) +
                      (item.name.length > 25 ? "..." : "")
                    }}</router-link
                  >
                </el-tooltip>
                <div class="flex items-center">
                  <span
                    class="mr-8 mb-1 bg-red-200 text-red-400 text-center p-1 text-xs"
                    >{{ item.mark }}</span
                  >
                  <span
                    >{{ moment(item.releaseTime).format("YYYY-MM-DD") }}
                  </span>
                </div>
              </li>
            </ul>
          </el-main>
          <el-aside width="450px">
            <el-carousel width="450px" height="250px">
              <el-carousel-item
                v-for="(item, index) of progressNews.slice(0, 4)"
                :key="index"
                @click="handleClick(item)"
              >
                <el-image class="cursor-pointer" :src="item.coverMaterialUrl" />
                <div class="flex justify-center">
                  <text style="font-size: 12px; text-align: center">{{
                    item.name
                  }}</text>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-aside>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from "vue";
import { listNew } from "@/api/new";
import moment from "moment";
import router from "@/router";

const { VITE_API_PATH } = import.meta.env;

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
  dataList.data.forEach(item => {
    item.coverMaterialUrl = `${VITE_API_PATH}/static/${item.coverMaterialUrl}`;
  });
  workNews.value = classifyNews("工作动态");
  progressNews.value = classifyNews("进展成效");
  console.log(dataList.data[1].coverMaterialUrl);
  // console.log(dataList.coverMaterialUrl);
  // console.log(dataList);
  console.log(workNews);
}

function handleClick(item) {
  router.push({ name: "Information", params: { id: item.id } });
}

const classifyNews = newType => {
  return dataList.data.filter(news => news.type === newType);
};
/*按照浏览量排序*/
const viewNews = computed(() => {
  const workNewsCopy = workNews.value.slice();
  return workNewsCopy.sort((a, b) => b.viewCount - a.viewCount);
});

onMounted(async () => {
  await showNews();
  console.log(viewNews);
});
</script>

<style>
.bg-image {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.image {
  flex-wrap: nowrap;
}
</style>
