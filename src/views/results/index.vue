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
            <text id="res" style="position: absolute">当前成果</text>
          </div>
        </div>
        <el-container>
          <el-tabs v-model="activeName" class="demo-tabs" tab-position="left">
            <el-tab-pane
              style="width: 1200px; height: 400px"
              v-for="(item, index) in dataList.data"
              :key="index"
              :label="item.module"
              :name="item.module"
            >
              <el-header style="margin-left: -20px">
                <el-container>
                  <el-text>现状： </el-text>
                  <el-text v-for="(i, v) in item.children" :key="v">
                    {{ i.ecologicalStatus }}&nbsp; &nbsp;
                  </el-text>
                </el-container>

                <el-container>
                  <el-text> 分级： </el-text>
                  <el-text v-for="(i, v) in item.children" :key="v">
                    {{ i.rank }}&nbsp; &nbsp;
                  </el-text>
                </el-container>

                <el-container>
                  <el-text> 功能： </el-text>
                  <el-text v-for="(i, v) in item.children" :key="v">
                    {{ i.fun }}&nbsp; &nbsp;
                  </el-text>
                </el-container>
              </el-header>
              <el-main style="margin-left: -20px">
                <el-container
                  style="width: 1200px; height: 300px; overflow-x: auto"
                >
                  <el-image
                    v-for="(i, v) in item.achievementMaterialUrlArr"
                    :key="v"
                    style="flex-shrink: 0; width: 400px"
                    :src="`${VITE_API_PATH}/static/` + i"
                  />
                </el-container>
              </el-main>
            </el-tab-pane>
          </el-tabs>
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
            <text id="stage" to="/" style="position: absolute">阶段展示</text>
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
import { listCurrent, listPage, listProgress, modulesResults } from "@/api/new";
import router from "@/router";
import { useRouter } from "vue-router";
const activeName = ref();

const routerUse = useRouter();

const { VITE_API_PATH } = import.meta.env;

defineOptions({
  name: "Results"
});
// const imgUrl =
//   "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

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

const urlArr = reactive({
  arr: []
});

async function showNews() {
  loading.value = true;
  const { rows } = await listCurrent(form);
  dataList.data = rows.map(item => {
    item.achievementMaterialUrlArr = item.achievementMaterialUrl?.split("?");
    item.achievementMaterialUrlArr?.forEach(item => {
      urlArr.arr.push(item);
    });
    return {
      ...item,
      achievementMaterialUrlArr: item.achievementMaterialUrlArr
    };
  });
  loading.value = false;

  const obj = {};
  dataList.data.forEach(item => {
    const { module } = item;
    if (!obj[module]) {
      obj[module] = {
        module,
        children: []
      };
    }

    obj[module].children.push(item);
  });
  dataList.data = Object.values(obj);
  dataList.data = dataList.data.map(item => {
    const urlArr = [];
    item.children.forEach(item => {
      item.achievementMaterialUrlArr.forEach(item => {
        urlArr.push(item);
      });
    });
    return {
      ...item,
      achievementMaterialUrlArr: urlArr
    };
  });

  console.log(dataList.data);
  activeName.value = dataList.data[0].module;
}

const mdlData = ref();
const modulesData = async () => {
  const res = await modulesResults();
  console.log(res.data);

  let arrObj = [];
  for (const key in res.data) {
    const i = { module: key, children: res.data[key] };
    arrObj.push(i);
  }
  arrObj = arrObj.map(item => {
    item.children = item.children?.map(item => {
      item.achievementMaterialUrlArr = item.achievementMaterialUrl?.split("?");
      return {
        ...item,
        achievementMaterialUrlArr: item.achievementMaterialUrlArr
      };
    });
    return {
      ...item
    };
  });
  console.log(arrObj);
  mdlData.value = arrObj;
};

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

const scroll = () => {
  const title_id = routerUse.currentRoute.value.fullPath.split("?")[1];
  if (!title_id) {
    return;
  }
  console.log(title_id);
  if (title_id == "res") {
    document.getElementById("res").scrollIntoView();
  } else if (title_id == "stage") {
    document.getElementById("stage").scrollIntoView();
  }
};

onMounted(async () => {
  await showNews();
  await showPage();
  await showProgress();
  scroll();
  modulesData();
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

.el-container::-webkit-scrollbar-track {
  background: rgb(239 239 239);
}

.el-container::-webkit-scrollbar-thumb {
  background: rgb(150 150 151);
}
</style>
